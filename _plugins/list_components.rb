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

      component_dir = "#{@dir}"

      polymer_version = PolymerVersionDir.new('','','').render(context)
      if polymer_version
        component_dir = "#{polymer_version}/#{@dir}"
      end

      elements = {}
      prefix = Regexp.new "#{@prefix}-[a-z-]+"

      glob = File.join("#{component_dir}", "#{@prefix}-*", "**", "#{@prefix}-[a-z-]*.html")
      components = Pathname.glob(glob).uniq

      components.each do |f|
        contents = f.read # Read contents of file to extra all polymer-elements

        contents.scan(/^<polymer-element\sname="([a-z0-9-]+)"/).each do |match|
          if match
            name = match[0]

            matchPrefix = prefix.match(name)
            if (matchPrefix and !in_blacklist?(name) and !in_blacklist?(f.to_s))
              elements[name] = f.to_s
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
