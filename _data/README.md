## Version numbers

The `_data` folder can't have directories with dots in their name.

ex:

`_data/v0.5` gets processed into `site.data["v0"]`.

To work around this, use an underscore in your version directory. So data relating to version `0.5` goes in the `0_5` directory.
