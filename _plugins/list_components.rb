require 'pathname'
require 'json'

#
# Lists components names and urls as a JSON string.
#
# Usage:
#
# {% list_components dir:components prefix:core blacklist:"core-layout"%}
#
# Arguments:
#
# dir: directory to scan for components
# prefix: component with this prefix will be included in the list
# blacklist: space-separated list of components to ommit in the list
#
# When a region is selected, the region is de-indented as if the first
# non-whitespace character in the start tag is column 0.
#
# Example output:
#
# {"core-ajax":"components/core-ajax/core-ajax.html", ...,
#  "core-xhr":"components/core-ajax/core-xhr.html"}
#
module Jekyll
  class ListComponentsTag < Liquid::Tag

    include Liquid::StandardFilters
    Syntax = /(#{Liquid::QuotedFragment}+)?/

    def initialize(tag_name, markup, tokens)
      @attributes = {}

      # Parse parameters
      if markup =~ Syntax
        markup.scan(Liquid::TagAttributes) do |key, value|
          @attributes[key] = value
        end
      else
        raise SyntaxError.new("Syntax Error in 'list_components' - Valid syntax: list_components dir:components prefix:core blacklist:\"x\"]")
      end

      @dir = @attributes.has_key?('dir') ? @attributes['dir'] : nil
      @prefix = @attributes.has_key?('prefix') ? @attributes['prefix'] : '*/'

      # Establish blacklist of elements to not include.
      @blacklist = []
      if @attributes.has_key?('blacklist')
        @attributes['blacklist'] = @attributes['blacklist'][1..-2]
        @blacklist = @attributes['blacklist'].split
      end

      super
    end

    def render(context)
      elements = {}
      (Pathname.glob("#{@dir}/#{@prefix}-*") - Pathname.glob("#{@dir}/#{@blacklist}")).each do |i|
        i.children.each do |f|
          if f.extname == '.html'
            contents = f.read
            match = /^<polymer-element\sname="([a-z0-9-]+)"/.match(contents)
            if match
              name = match[1]
              prefix = Regexp.new "#{@prefix}-[a-z-]+"
              matchPrefix = prefix.match(name)
              if matchPrefix and !in_blacklist?(name)
                elements[name] = f.to_s
              end
            end
          end
        end
      end
      JSON.dump(elements)
    end

    def in_blacklist?(s)
      @blacklist.each do |b|
        if s.match(b.strip)
          return true
        end
      end
      return false
    end

  end
end

Liquid::Template.register_tag('list_components', Jekyll::ListComponentsTag)
