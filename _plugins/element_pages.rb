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
      # For each version, find the directory with the page template
      # and find the right versioned directory in _data. _data directories
      # can't have dots in their name, so data for version 0.5 lives in
      # the 0_5 directory
      if site.layouts.key? 'default'
        site.data['versions'].each do |version, val|
          dir = "#{version.gsub(/_/, '.')}/docs/elements"
          site.data["versions"]["#{version}"]["elements"].each_key do |element|
            site.pages << ElementPage.new(site, site.source, dir, element)
          end
        end
      end
    end
  end

end
