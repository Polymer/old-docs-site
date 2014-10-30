require "octopress-hooks"

class ProcessTOCHook < Octopress::Hooks::Page

  # # Manipulate page/post data before it has been processed with Liquid or
  # # Converters like Markdown or Textile.
  # #
  # def pre_render(page)
  #   #page.content = highlight_code(page.content)
  # end

  # # Manipulate page/post data after content has been processed to html.
  # #
  # def post_render(page)
  #   # page.content = wrap_toc_in_details(page.content)
  #   page.output = wrap_toc_in_details(page.output)
  # end

  # # Access page/post data after it has been successfully written to disk.
  # #
  # def post_write(page)
  #   #log_something(page.title)
  # end

  def post_render(page)
    wrap_toc_in_details(page.output)
  end

  # Moves the generated <ul id="markdown-toc"> into a <details> element.
  def wrap_toc_in_details(output)
    output.gsub! /\<\!--TOC_START--\>(.+)?\<\!--TOC_END--\>/m do
     <<-END
     <details id="toc">
       <summary>Table of contents</summary>
       #{$1}
     </details>
     END
    end
  end

end
