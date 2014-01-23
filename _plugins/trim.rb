require 'liquid'

module TrimFilter

  # Trim whitespace
  def trim(input)
    input.strip
  end

end

Liquid::Template.register_filter(TrimFilter)

