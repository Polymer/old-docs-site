require 'pathname'

# {% directory dir:components/polymer-ui-elements org:PolymerLabs %}
# {% directory demos:true tag:li branch:master dir:components/polymer-ui-elements glob:polymer-ui-* blaclistglob:polymer-something-* blacklist:"polymer-dev polymer-expressions polymer-elements" %}

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
        raise SyntaxError.new("Syntax Error in 'directory' - Valid syntax: directory demo:x branch:x tag:x dir:x glob:x blacklist:\"x\"]")
      end

      @dir = @attributes.has_key?('dir') ? @attributes['dir'] : nil
      @glob = @attributes.has_key?('glob') ? @attributes['glob'] : '*/'
      @blacklist_glob = @attributes.has_key?('blacklistglob') ? @attributes['blacklistglob'] : ''
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
      @config = context.registers[:site].config

      project_title = @config['project_title'].downcase

      elements = []
      #Pathname.glob("#{@path}/#{project_title}-*/").each do |i|
      #Pathname.glob("#{project_title}-all/#{@path}/").each do |i|
      (Pathname.glob("#{@dir}/#{@glob}") - Pathname.glob("#{@dir}/#{@blacklist_glob}")).each do |i|
        name = i.basename.to_s.sub('.html', '')

        if !in_blacklist?(name)
          elements.push({
            'name' => name,
            'full_path' => i.to_s,
            'path' => i.to_s.split('/')[1..-1].join('/') # remove "components"
          })
        end
      end

      elements.map{|el| render_element(el).strip}

    end

    def render_element(element) 
      file_path = "#{element['full_path']}/#{element['name']}.html"
      if !File.exists?(file_path)
        file_path = "#{element['full_path']}"
      end

      demo_path = "#{element['full_path']}/demo.html"
      if !File.exists?(demo_path)
       demo_path = "#{element['full_path']}/index.html"
      end

      github_url = github_url(element)
      bower_use_url = bower_use_url(element)
      bower_install_url = bower_install_url(element)
      tag_name = element['name']
      #iframe_demo = generate_iframe_demo("/#{file_path}", tag_name) if @demos else ''
      iframe_demo = generate_iframe_demo2("/#{demo_path}") if @demos else ''
      api_doc_file = "#{@dir}/docs/classes/#{element['name']}.html"

      begin
        p api_doc_file
        f = File.new(api_doc_file, "r")
        api_docs = f.read()
      rescue => e
        api_docs = "<div class=\"nodocs\"></div>"
      ensure
        f.close unless f.nil?
      end

      <<-END
      <#{@tag} id="#{tag_name}" data-element-file="/#{file_path}">
        <header onclick="this.parentElement.classList.toggle('expand');">
          <h2><span>&lt;#{tag_name}&gt;<polymer-ui-icon src="/images/picons/ic_arrowDropDown_dark_.png"></polymer-ui-icon></span>
            <a href="#{github_url}" target="_blank" alt="View source on Github" title="View source on Github"><polymer-ui-icon src="/images/picons/ic_polymer_source.svg"></polymer-ui-icon></a>
            <a href="/#{demo_path}" target="_blank" #{'disabled' if !File.exists?(demo_path)} alt="Run demo" title="Run demo"><polymer-ui-icon src="/images/picons/ic_contentCopy_.png"></polymer-ui-icon></a>
          </h2>
        </header>
        <span class="bower_install_instructions">
          <label>1. Install in your app:</label>
          <pre class="prettyprint">bower install #{@config['project_title']}/#{bower_install_url}</pre>
          <label>2. Import:</label>
          <pre class="prettyprint">&lt;link rel="import"
      href="#{bower_use_url}"&gt;</pre>
        </span>
        <span class="api_documentation">
          <label>Usage:</label>
          #{api_docs}
        </span>
      </#{@tag}>
      END
    end

    # Generates and iframe embed to demo the element using <iframe srcdoc>.
    def generate_iframe_demo(file_path, tag_name)
      <<-END
      <iframe srcdoc='
        <script src="/polymer.js"></script>
        <link rel="import" href="#{file_path}">
        <#{tag_name}></#{tag_name}>'>
      </iframe>
      END
    end

    # Generates and iframe embed to demo the element using <iframe src>.
    def generate_iframe_demo2(file_path)
      <<-END
      <iframe style="width: 100%;" src="#{file_path}"></iframe>
      END
    end

    def github_url(element)
      github_project_url = "https://github.com/#{@org}"

      repo, element_path = element['path'].split('/')

      "#{github_project_url}/#{repo}/blob/#{@branch}/#{element_path}#{element['name']}.html"
    end

    def bower_install_url(element)
      repo, element_path = element['path'].split('/')

      "#{repo}"
    end

    def bower_use_url(element)
      repo, element_path = element['path'].split('/')

      "bower_components/#{repo}/#{element_path}#{element['name']}.html"
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