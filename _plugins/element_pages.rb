module Jekyll

  class ElementPage < Page
    def initialize(site, base, dir, element)
      @site = site
      @base = base
      @dir = dir
      @name = "#{element}.html" # the name of the page to be generated

      self.process(@name)
      # read_yaml is poorly named. It does not only read YAML,
      # it also sets the content for the page
      self.read_yaml(File.join(base, dir), 'element-template.md')

      # Setup page data, basically the same as writing YAML front matter
      isPaperElement = element.start_with? "paper-"

      self.data['element'] = element
      self.data['title'] = "Polymer #{isPaperElement ? 'paper' : 'core'} elements"
      self.data['type'] = 'elements'
      self.data['shortname'] = 'Elements'
      if isPaperElement
        self.data['subtitle'] = 'material design'
      end
      self.data['add_permalinks'] = false
    end
  end

  class ElementPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'default'
        dir = 'docs/elements'
        site.data["elements"].each_key do |element|
          site.pages << ElementPage.new(site, site.source, dir, element)
        end
      end
    end
  end

end
