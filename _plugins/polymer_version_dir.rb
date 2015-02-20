class PolymerVersionDir < Liquid::Tag
  def initialize(tag_name, markup, tokens)
     super
  end

  def render(context)

    page_url = context.environments.first['page']['url']
    page_url = page_url.split('/')[1]
  end
end

Liquid::Template.register_tag('polymer_version_dir', PolymerVersionDir)
