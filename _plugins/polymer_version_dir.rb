# Returns the version directory in the current URL.
# Example:
# {% polymer_version_dir % }
# /0.5/polymer/polymer.html -> 0.5

class PolymerVersionDir < Liquid::Tag
  def initialize(tag_name, markup, tokens)
    super
  end

  def render(context)
    page_url = context.environments.first['page']['url']
    version = page_url.split('/')[1]
    begin
      v = Integer(version[0]) # check if there's a version in the URL.
    rescue ArgumentError
      version = nil
    end
    version
  end
end

Liquid::Template.register_tag('polymer_version_dir', PolymerVersionDir)
