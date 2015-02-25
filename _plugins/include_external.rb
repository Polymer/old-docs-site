#
# Includes external code.
# Supports including named regions from a sample file.
#
# Usage:
#
# {% include_external filename %}
#
# or, to render a document under a polymer version directory:
#
# {% include_external filename version_prefix:0.5 %}
#
# or:
#
# {% include_external filename region-name %}
#
# Where regions are delimited by start and end tags like this:
#
# // [START region-name]
# // [END region-name]
#
# /* [START region-name] */
# /* [END region-name] */
#
# HTML-style comments are also supported:
#
# <!-- [START region-name] -->
# <!-- [END region-name] -->
#
# Regions may overlap. Region start and end tags are always omitted from the
# included content.
#
# When a region is selected, the region is de-indented as if the first
# non-whitespace character in the start tag is column 0.
#
#
module Jekyll
  class IncludeExternal < Liquid::Tag

    include Liquid::StandardFilters
    Syntax = /(#{Liquid::QuotedFragment}+)?/

    def initialize(tag_name, param_string, tokens)
      params = param_string.split(" ").map(&:strip)
      @filename = params[0]
      @inregion = true
      if (params.length > 1)
        @region = params[1]
        @inregion = false
      end

      @attributes = {}

      # Parse named parameters
      if param_string =~ Syntax
        param_string.scan(Liquid::TagAttributes) do |key, value|
          @attributes[key] = value
        end
      else
        raise SyntaxError.new("Syntax Error in 'include_external' - Valid syntax: include_external version_prefix:0.5 filename region-name")
      end

      # Prepend docs version directory prefix to the pathname (if one was passed).
      if @attributes.has_key?('version_prefix')
        @filename.prepend(@attributes['version_prefix'].to_s)
      end

      @output = []

      begin
        startpattern = /^\s*(?:\/\/|\/\*|<!--)\s*\[START\s+(\S*)\s*\]/
        endpattern = /^\s*(?:\/\/|\/\*|<!--)\s*\[END\s+(\S*)\s*\]/
        f = File.new(@filename, "r")
        text = f.read()
        text.each_line do |line|
          if m = startpattern.match(line)
            if @region && @region ==  m[1]
              @inregion = true
              @base_indent = line[/^ */]
            end
          elsif m = endpattern.match(line)
            if @region && @region ==  m[1]
              @inregion = false
            end
          else
            if @inregion
              if @base_indent
                line = line.sub(@base_indent,"")
              end
              @output << line
            end
          end
        end

      rescue => e
        @output << "<div class=\"error\">IncludeExternal error: #{e}</div>"
      ensure
        f.close unless f.nil?
      end

      # Use entire file if no regions were found.
      if @output.length == 0
        @output << text
      end

      super
    end

    def render(context)
      @output.join("")
    end
  end
end

Liquid::Template.register_tag('include_external', Jekyll::IncludeExternal)
