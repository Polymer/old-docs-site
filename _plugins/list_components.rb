require 'pathname'
require 'json'

module Jekyll
  class ListComponentsTag < Liquid::Tag

    include Liquid::StandardFilters
    Syntax = /(#{Liquid::QuotedFragment}+)?/

    def initialize(tag_name, markup, tokens)
      @attributes = {}

      # Parse parameters
      if markup =~ Syntax
        markup.scan(Liquid::TagAttributes) do |key, value|
          #p key + ":" + value
          @attributes[key] = value
        end
      else
        raise SyntaxError.new("Syntax Error in 'directory' - Valid syntax: directory demo:x branch:x tag:x dir:x prefix:x blacklist:\"x\"]")
      end

      @dir = @attributes.has_key?('dir') ? @attributes['dir'] : nil
      @prefix = @attributes.has_key?('prefix') ? @attributes['prefix'] : '*/'
      @blacklist_prefix = @attributes.has_key?('blacklistprefix') ? @attributes['blacklistprefix'] : ''
      @tag = @attributes.has_key?('tag') ? @attributes['tag'] : 'li'
      @branch = @attributes.has_key?('branch') ? @attributes['branch'] : 'master'
      @org = @attributes.has_key?('org') ? @attributes['org'] : 'Polymer'
      @demos = @attributes.has_key?('demos') ? @attributes['demos'] : false

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
      #Pathname.prefix("#{@path}/#{project_title}-*/").each do |i|
      #Pathname.prefix("#{project_title}-all/#{@path}/").each do |i|

      puts Pathname.glob("#{@dir}/#{@prefix}")
      (Pathname.glob("#{@dir}/#{@prefix}-*") - Pathname.glob("#{@dir}/#{@blacklist_prefix}")).each do |i|

        pn = Pathname.new(i.to_s + '/bower.json')
        if pn.exist?
          data_hash = JSON.parse(pn.read)
          if data_hash["private"] == true
            public = false
          end
        end

        #puts i.to_s



        i.children.each do |f|
          if f.extname == '.html'
            contents = f.read
            #puts contents
            match = /<polymer-element\sname="([a-z0-9-]+)"/.match(contents)
            if match

              name = match[1]
              prefix = Regexp.new "#{@prefix}-[a-z-]+"
              matchPrefix = prefix.match(name)
              puts matchPrefix
              #puts f
              #puts '-------'
              if matchPrefix and !in_blacklist?(name)
                elements[name] = f.to_s
                #elements.push({
                #  'name' => name,
                #  'path' => f.to_s
                #})
              end


            end


          end
        end




      end

      #elements.map{|el| render_element(el).strip}

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