---
title:  "Discover and communicate with nearby Bluetooth devices"
---

We're particularly glad to share with you today the [platinum bluetooth elements](https://elements.polymer-project.org/elements/platinum-bluetooth?active=platinum-bluetooth-device), a
brand new set of [Polymer platinum
elements](https://elements.polymer-project.org/browse?package=platinum-elements)
to discover and communicate with nearby Bluetooth devices. These new components
are powered behind the scenes by the experimental [Web Bluetooth
API](http://webbluetoothcg.github.io/web-bluetooth/).

Even though the Web Bluetooth API specification is not finalized yet, we can
already play with it as it's partially implemented in Chrome OS M45
behind an experimental flag. Go to `chrome://flags/#enable-web-bluetooth`, enable
the highlighted flag, restart Chrome and you should be able to scan for and
connect to nearby Bluetooth devices and read/write Bluetooth characteristics.

## Demo

The [official
demo](https://elements.polymer-project.org/elements/platinum-bluetooth?view=demo:demo/)
featuring [platinum bluetooth
elements](https://elements.polymer-project.org/elements/platinum-bluetooth)
will give you an idea of what you can do with it:

<a href="https://elements.polymer-project.org/elements/platinum-bluetooth?view=demo:demo/">
  <img src="/images/releases/platinum-bluetooth-demo.png" style="width: auto; margin-left: auto; margin-right: auto; height: 450px" alt="platinum bluetooth demo screenshot">
</a>

## Scan for Bluetooth Devices

It is worth mentioning again there that due to [security
requirements](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web#https-only),
Web Bluetooth will only work for HTTPS websites.  We would recommend you set up
[HSTS](http://www.chromium.org/hsts) for enforcing HTTPS on your website. If
you don't control the server, check out our new
[`<platinum-https-redirect>`](https://elements.polymer-project.org/elements/platinum-https-redirect)
element.

The new
[`<platinum-bluetooth-device>`](https://elements.polymer-project.org/elements/platinum-bluetooth?active=platinum-bluetooth-device)
element allows you to easily [discover nearby bluetooth
devices](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web#scan-for-bluetooth-devices).
For instance, here's how to request a nearby bluetooth device advertising
Battery service :

{% highlight html %}

<platinum-bluetooth-device
    services-filter='["battery_service"]'>
</platinum-bluetooth-device>

{% endhighlight %}

{% highlight javascript %}

button.addEventListener('click', function() {
  document.querySelector('platinum-bluetooth-device').request()
  .then(function(device) { console.log(device.name); })
  .catch(function(error) { console.error(error); });
});

{% endhighlight %}

## Read a Bluetooth Characteristic

What we really want to do now is read a Bluetooth Characteristic. This
can be simply achieved with a child element [`<platinum-bluetooth-characteristic>`](https://elements.polymer-project.org/elements/platinum-bluetooth?active=platinum-bluetooth-characteristic).

Once again, here's how to read battery level from a nearby bluetooth
device advertising Battery service:

{% highlight html %}

<platinum-bluetooth-device services-filter='["battery_service"]'>
  <platinum-bluetooth-characteristic
      service='battery_service'
      characteristic='battery_level'>
  </platinum-bluetooth-characteristic>
</platinum-bluetooth-device>

{% endhighlight %}

{% highlight javascript %}

var bluetoothDevice = document.querySelector('platinum-bluetooth-device');
var batteryLevel = document.querySelector('platinum-bluetooth-characteristic');

button.addEventListener('click', function() {
  bluetoothDevice.request().then(function() {
    return batteryLevel.read().then(function(value) {
      var data = new DataView(value);
      console.log('Battery Level is ' + data.getUint8(0) + '%');
    });
  })
  .catch(function(error) { });
});

{% endhighlight %}

It is also possible for `<platinum-bluetooth-characteristic>` to use data
binding to bind to `value` in response to a read.

## Write to a Bluetooth Characteristic

Here's an example of how to reset the energy expended on a nearby bluetooth
device advertising Heart Rate service:

{% highlight html %}

<platinum-bluetooth-device services-filter='["heart_rate"]'>
  <platinum-bluetooth-characteristic
      service='heart_rate'
      characteristic='heart_rate_control_point'>
  </platinum-bluetooth-characteristic>
</platinum-bluetooth-device>

{% endhighlight %}

{% highlight javascript %}

var bluetoothDevice = document.querySelector('platinum-bluetooth-device');
var heartRateCtrl = document.querySelector('platinum-bluetooth-characteristic');

button.addEventListener('click', function() {
  bluetoothDevice.request().then(function() {
    // Writing 1 is the signal to reset energy expended.
    var resetEnergyExpended = new Uint8Array([1]);
    return heartRateCtrl.write(resetEnergyExpended).then(function() {
      console.log('Energy expended has been reset');
    });
  })
  .catch(function(error) { });
});

{% endhighlight %}

One of our favorite ways to write though is to use the `auto-write` property of
the `<platinum-bluetooth-characteristic>` element. When set to `true`, changes
in `value` will automatically drive characteristic writes.

As always, if you have any questions around how this works, please feel free to
use the [polymer tag](http://stackoverflow.com/questions/tagged/polymer) on
StackOverflow, or join us on the Polymer [Slack
Channel](http://polymer-slack.herokuapp.com/).
