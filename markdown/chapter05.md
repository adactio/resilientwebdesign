#Chapter 5: Layers

In his classic book _How Buildings Learn_ Stewart Brand highlights an idea by the British architect Frank Duffy:

> A building properly conceived is several layers of longevity.

Duffy called these shearing layers. Each of the layers moves at a different timescale. Brand expanded on the idea, proposing six alliterative layers:

1. **Site**—the physical location of a building only changes on a geological timescale.
2. **Structure**—the building itself can last for centuries.
3. **Skin**—the exterior surface gets a facelift or a new lick of paint every few decades.
4. **Services**—the plumbing and wiring need to be updated every ten years or so.
5. **Space plan**—the layout of walls and doors might change occasionally.
6. **Stuff**—the arrangement of furniture in a room can change on a daily basis.

The idea of shearing layers can also be applied to our creations on the web. Our domain names are the geological sites upon which we build. At the other end of the timescale, content on the web—the "stuff"—can be added and updated by the hour, the minute, or even the second. In between are the layers of structure, presentation, and behaviour: HTML, CSS, and JavaScript.

Those layers can be loosely-coupled, but they aren't completely independent. Just as a building cannot have furniture without first having rooms and walls, a style sheet needs some markup to act upon. The coupling between structure and presentation is handled through selectors in CSS: element selectors, class selectors, and so on. With JavaScript, the coupling is handled through the vocabulary of the Document Object Model, or DOM.

In a later book, _The Clock Of The Long Now_, Stewart Brand applied the idea of shearing layers—or pace layers—to civilisation itself. The slowest moving layer is nature itself, then there's culture, followed by governance, then infrastructure, and finally commerce and fashion as the fastest layers. In a loosely-coupled way, each layer depends on the layer below. In turn, the accumulation of each successive layer enables an "adjacent possible" filled with more opportunities.

Likewise, the expressiveness of CSS and JavaScript is only made possible on a foundation of HTML, which itself requires a URL to be reachable, which in turn depends on the HyperText Transfer Protocol, which sits atop the bedrock of TCP/IP.

Each of the web's shearing layers can be peeled back to reveal a layer below. Running that process in reverse—applying each layer in turn—is a key principle of resilient web design.

##Progressive enhancement

In 2003, the South by Southwest festival in Austin, Texas was primarily an event for musicians and filmmakers. Today the music and film portions are eclipsed by the juggernaut of South by Southwest Interactive, dedicated to all things digital. In 2003, South by Southwest Interactive was a small affair, squeezed into one corner of one floor of the Austin Convention Center. It was a chance for a few web designers and bloggers to get together and share ideas. That year, Steven Champeon and Nick Finck presented a talk entitled _Inclusive Web Design For the Future with Progressive Enhancement_. They opened with this call to arms:

> Web design must mature and accept the developments of the past several years, abandon the exclusionary attitudes formed in the rough and tumble dotcom era, realize the coming future of a wide variety of devices and platforms, and separate semantic markup from presentation logic and behavior.

Like Tim Berners-Lee, Steven Champeon had experience of working with SGML, the markup language that would so heavily influence HTML. In dealing with documents that needed to be repurposed for different outputs, he came to value the separation of structure from presentation. A meaningfully marked up document can be presented in multiple ways through the addition of CSS and JavaScript.

This layered approach to the web allows the same content to be served up to a wide variety of people. But this doesn't mean that everyone gets the same experience. Champeon realised that a strong separation of concerns would allow enhancements to be applied according to the capabilities of the end user's device.

To paraphrase Karl Marx, progressive enhancement allows designers to ask from each browser according to its ability, and to deliver to each device according to its needs.

###Do websites need to look exactly the same in every browser?

Some web designers were concerned that progressive enhancement would be a creative straitjacket. Designing for the lowest common denominator did not sound like a recipe for progress. But this was a misunderstanding. Progressive enhancement asks that designers *start* from the lowest common denominator (a well marked-up document), but there is no limit to where they can go from there.

In fact, it's the very presence of a solid baseline of HTML that allows web designers to experiment with the latest and greatest CSS. Thanks to Postel's Law and the loose error-handling model of CSS, designers are free to apply styles that only work in the newest browsers.

This means that not everyone will experience the same visual design. This is a feature of the web, not a bug. New browsers and old browsers; monochrome displays and multi-coloured displays; fast connections and slow connections; big screens, small screens, and no screens; everyone can access your content. That content *should* look different in such varied situations. If a website looks the same on a ten-year old browser as it does in the newest devices, then it probably isn't taking advantage of the great flexibility that the web offers.

To emphasis this, designer Dan Cederholm created a website to answer the question, "Do websites need to look exactly the same in every browser?" You can find the answer to that question at the URL:

dowebsitesneedtolookexactlythesameineverybrowser.com

At the risk of spoiling the surprise for you, the answer is a resounding "No!" If you visit that website, you will see that answer proudly displayed. But depending on the capabilities of your browser, you may or may not some of the stylistic flourishes applied to that single-word answer. Even if you don't get *any* of the styles, you'll still get the content marked up with semantic HTML.

##Cutting the mustard

Separating structure and presentation is relatively straightforward. You can declare whatever styles you want, safe in the knowledge that browsers will ignore what they don't understand. Separating structure and behaviour isn't quite so easy. If you give a browser some JavaScript that it doesn't understand, not only will it not apply the desired behaviour, it will refuse to parse the rest of the JavaScript.

Before you use a particular feature in JavaScript, it's worth testing to see if that feature is supported. This kind of feature detection can save your website's visitors from having a broken experience because of an unsupported feature. If you want to use Ajax, check first that the browser supports the object you're about to use to enable that Ajax functionality. If you want to use the geolocation API, check first that the browser supports it.

A team of web developers working on the BBC news website referred to this kind of feature detection as cutting the mustard. Browsers that cut the mustard get an enhanced experience. Browsers that don't cut the mustard still get access to the content, but without the JavaScript enhancements.

Feature detection, cutting the mustard, whatever you want to call it, is a fairly straightforward technique. Let's say you want to traverse the DOM using <code>querySelector</code> and attach events to some nodes in the document using <code>addEventListener</code>. Your mustard-cutting logic might look something like this:

	if (document.querySelector && window.addEventListener) {
		// Enhance!
	}

There are two points to note here:

1. This is feature detection, not browser detection. Instead of asking "which browser are you?" and trying to infer feature support from the answer, it is safer to simply ask "do you support this feature?"
2. There is no <code>else</code> statement.

##Aggressive enhancement

Back when web designers were trying to exert print-like control over web browsers, a successful design was measured in pixel perfection: did the website look exactly the same in every browser?

Unless every browser supported a particular feature—like, say, rounded corners in CSS—then that feature was off the table. Instead, designers would fake it with extra markup and images. The resulting websites lacked structural honesty. Not only was this a waste of talent and energy on the part of the designers, it was a waste of the capabilities of modern web browsers.

The rise of mobiles, tablets, and responsive design helped to loosen this restrictive mindset. It is no longer realistic to expect pixel-perfect parity across devices and browsers. But you'll still find web designers bemoaning the fact that they have to support an older outdated browser because a portion of their audience are still using it.

They're absolutely right. Anyone using that older browser should have access to the same content as someone using the latest and greatest web browser. But that doesn't mean they should get the same experience. As Brad Frost puts it:

> There is a difference between support and optimization.

*Support* every browser ...but *optimise* for none.

Some designers have misunderstood progressive enhancement to mean that *all* functionality must be provided to *everyone*. It's the opposite. Progressive enhancement means providing *core* functionality to everyone. After that, it's every browser for itself. Far from restricting what features you can use, progressive enhancement provides web designers with a way to safely use the latest and greatest features without worrying about older browsers. Scott Jehl of the agency Filament Group puts it succinctly:

> Progressive Enhancement frees us to focus on the costs of building features for modern browsers, without worrying much about leaving anyone out. With a strongly qualified codebase, older browser support comes nearly for free.

Scott worked on the responsive website for the Boston Globe newspaper. His colleague at the time, Mat Marquis, noted:

If a website is built using progressive enhancement then it's okay if a particular feature isn't supported or fails to load: Ajax, geolocation, whatever. As long as the core functionality is still available, web designers don't need to bend over backwards trying to crowbar support for newer features into older browsers. 

You also get a website that's more resilient to JavaScript's error-handling model. Mat Marquis worked alongside Scott Jehl on the responsive website for the Boston Globe. He noted:

> Lots of cool features on the Boston Globe don’t work when JS breaks; “reading the news” is not one of them.

The trick is identifying what it is considered core functionality and what is considered an enhancement.