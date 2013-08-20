require 'pathname'

# {% directory dir:polymer-all/polymer-ui-elements %}
# {% directory demos:true tag:li branch:master dir:polymer-all/polymer-ui-elements glob:polymer-ui-* %}

module Jekyll
  class DirectoryTag < Liquid::Tag

    # def initialize(tag_name, path, tokens)
    #   super
    #   @path = path.strip
    # end

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
        raise SyntaxError.new("Syntax Error in 'directory' - Valid syntax: directory demo:x branch:x tag:x dir:x glob:x]")
      end

      @dir = @attributes.has_key?('dir') ? @attributes['dir'] : nil
      @glob = @attributes.has_key?('glob') ? @attributes['glob'] : '*/' 
      @tag = @attributes.has_key?('tag') ? @attributes['tag'] : 'li' 
      @branch = @attributes.has_key?('branch') ? @attributes['branch'] : 'stable'
      @demos = @attributes.has_key?('demos') ? @attributes['demos'] : false 

      super
    end

    def render(context)
      @config = context.registers[:site].config

      project_title = @config['project_title'].downcase

      elements = []
      #Pathname.glob("#{@path}/#{project_title}-*/").each do |i|
      #Pathname.glob("#{project_title}-all/#{@path}/").each do |i|
      Pathname.glob("#{@dir}/#{@glob}").each do |i|
        elements.push({
          'name' => i.basename.to_s.sub('.html', ''),
          'full_path' => i.to_s,
          'path' => i.to_s.split('/')[1..-1].join('/') # remove polymer-all
        })
      end

      elements.map{|el| render_element(el).strip}

    end

    def render_element(element) 
      file_path = "#{element['full_path']}/#{element['name']}.html"
      if !File.exists?(file_path)
        file_path = "#{element['full_path']}"
      end

      demo_path = "#{element['full_path']}/index.html"
      #if !File.exists?("#{element['full_path']}/index.html")
      #  demo_path = "#{element['full_path']}"
      #end

      github_url = github_url(element)
      tag_name = element['name']
      #iframe_demo = generate_iframe_demo("/#{file_path}", tag_name) if @demos else ''
      iframe_demo = generate_iframe_demo2("/#{demo_path}") if @demos else ''
      api_doc_file = "#{@dir}/docs/classes/#{element['name']}.html"

      begin
        f = File.new(api_doc_file, "r")
        api_docs = f.read()
      rescue => e
        api_docs = "<div class=\"nodocs\"></div>"
      ensure
        f.close unless f.nil?
      end

      <<-END
      <#{@tag} data-element-file="/#{file_path}">
        <h3 id="#{tag_name}">&lt;#{tag_name}&gt;</h3>
        <span class="links">
          <a href="#{github_url}" target="_blank">source</a>
          <a href="/#{demo_path}" target="_blank" #{'disabled' if !File.exists?(demo_path)}>demo</a>
          <div #{'hidden' if !iframe_demo}>#{iframe_demo}</div>
        </span>
        #{api_docs}
      </#{@tag}>
      END
    end

    def generate_iframe_demo(file_path, tag_name)
      <<-END
      <iframe srcdoc='
        <script src="/polymer.min.js"></script>
        <link rel="import" href="#{file_path}">
        <#{tag_name}></#{tag_name}>'>
      </iframe>
      END
    end

    def generate_iframe_demo2(file_path)
      <<-END
      <iframe style="width: 100%;" src="#{file_path}"></iframe>
      END
    end

    def github_url(element)
      github_project_url = "https://github.com/#{@config['project_title']}"

      repo, element_path = element['path'].split('/')

      "#{github_project_url}/#{repo}/blob/#{@branch}/#{element_path}/#{element['name']}.html"
    end
  end
end

Liquid::Template.register_tag('directory', Jekyll::DirectoryTag)



# {% comment %}
# #https://github.com/christianhellsten/jekyll-plugins/blob/master/delicious.rb
# {% directory repo:polymer-elements glob:polymer-* %}
#   {{item.name}}
# {% enddirectory %}
# {% endcomment %}

# module Jekyll
#   class DirectoryTag < Liquid::Block

#     include Liquid::StandardFilters
#     Syntax = /(#{Liquid::QuotedFragment}+)?/ 

#     def initialize(tag_name, markup, tokens)
#       @variable_name = 'item'
#       @attributes = {}
      
#       # Parse parameters
#       if markup =~ Syntax
#         markup.scan(Liquid::TagAttributes) do |key, value|
#           #p key + ":" + value
#           @attributes[key] = value
#         end
#       else
#         raise SyntaxError.new("Syntax Error in 'directory' - Valid syntax: directory repo:x glob:x]")
#       end

#       @repo = @attributes.has_key?('repo') ? @attributes['repo'] : nil
#       @glob = @attributes['glob']
#       @name = 'item'

#       super
#     end

#     def render(context)
#       context.registers[:delicious] ||= Hash.new(0)
    
#       if @ttl
#         collection = CachedDelicious.tag(@username, @tag, @count, @ttl)
#       else
#         collection = Delicious.tag(@username, @tag, @count)
#       end

#       length = collection.length
#       result = []
              
#       # loop through found bookmarks and render results
#       context.stack do
#         collection.each_with_index do |item, index|
#           attrs = item.send('table')
#           context[@variable_name] = attrs.stringify_keys! if attrs.size > 0
#           context['forloop'] = {
#             'name' => @name,
#             'length' => length,
#             'index' => index + 1,
#             'index0' => index,
#             'rindex' => length - index,
#             'rindex0' => length - index -1,
#             'first' => (index == 0),
#             'last' => (index == length - 1) }

#           result << render_all(@nodelist, context)
#         end
#       end
#       result
#     end
#   end
# end

# Liquid::Template.register_tag('directory', Jekyll::DirectoryTag)