#Chapter 4: Languages

Jon Postel was one of the engineers working on the ARPANET, the precursor to the internet. He wanted to make sure that the packets—or "datagrams"—being shuttled around the network were delivered in the most efficient way. He came to realise that a lax approach to errors was crucial to effective packet switching.

If a node on the network receives a datagram that has errors, but is still understandable, then the packet should be processed anyway. Conversely every node on the network should attempt to send well-formed packets. This line of thinking was enshrined in the Robustness Principle, also known as Postel's Law:

> Be conservative in what you send; be liberal in what you accept.

If that sounds familiar, it's because that's the way that web browsers deal with HTML and CSS. Even if there are errors in the HTML or CSS, the browser will still attempt to process the information, skipping over any pieces that it can't parse.

##Declaration

HTML and CSS are both examples of declarative languages. An author writing in a declarative language describes a desired outcome without providing step-by-step instructions to the computer processing the file. With HTML, you can describe the nature of the content—paragraphs, headings, form fields, etc.—without having to explain exactly what the browser should do with that information. With CSS, you can describe the desired appearance of the content—colours, borders, etc.—without having to write a program to apply those styles.

Most programming languages are not declarative, they are imperative. Perl, Java, C++ ...these are all examples of imperative languages. If you're writing in one of those languages, you must provide precise instructions to the computer interpreting your code.

Imperative languages provide you with more power and precision than declarative languages. That comes at a price. Imperative languages tend to be harder to learn than declarative languages. It's also harder to apply Postel's Law to imperative languages. If you make a single mistake—one misplaced comma or semi-colon—the entire program may fail.

Imperative languages such as PHP, Ruby, and Python can be found on the servers powering the World Wide Web, reading and writing database records, processing input, and running complex algorithms. You can choose just about any programming language you want when writing server-side code. Unlike the unknowability of the end user's web browser, you have control over your server's capabilities.

If you want to write imperative code that runs in a web browser, you only have one choice: JavaScript.

##Scripting

The idea of executing a program from within a web page is as old as the web itself. Here's an early email to the www-talk mailing list:

> I would like to know, whether anybody has extended WWW such, that it is possible to start arbitrary programs by hitting a button in a WWW browser.

Tim Berners-Lee, creator of the World Wide Web, responded:

> Very good question. The problem is that of programming language. You need something really powerful, but at the same time ubiquitous. Remember a facet of the web is universal readership. There is no universal interpreted programming  language.

That was in 1992. The universal interpreted programming language finally arrived in 1996. It was written in ten days by programmer at Netscape named Brendan Eich.

The language went through a few name changes. First it was called Mocha. Then it was officially launched as LiveScript. Then the marketing department swept in and renamed it JavaScript, hoping that the name would ride the wave of hype associated with the then-new Java language. In truth, the languages have little in common. Java is to JavaScript as ham is to hamster.

##Patterns of progress

JavaScript gave designers the power to update web pages even after they had loaded. Two common uses soon emerged: rollovers and form validation.

Swapping out images when someone hovers their cursor over a link might not seem like a sensible use of a brand new programming language, but back in the nineties there was no other way of creating hover effects.

Before JavaScript came along, a form would have to be submitted to a web server before you could check to make sure that all the required fields were filled in, or that the information that was entered corresponded to an expected format.

Both of those use cases still exist, but now there's no need to reach for JavaScript. You can create rollover effects using the <code>:hover</code> pseudo-class in CSS. You can validate form fields using the <code>required</code> and <code>type</code> attributes in HTML.

That's a pattern that repeats again and again: a solution is created in an imperative language and if it's popular enough, it migrates to a declarative language over time. When a feature is available in a declarative language, not only is it easier to write, it's also more robust.

The loose error-handling of HTML and CSS means that any authoring mistakes or browser support issues are handled gracefully; the browser simply ignores what it doesn't understand and carries on. By contrast, if you give a browser some badly-formed JavaScript or attempt to use an unsupported JavaScript feature, not only will the browser throw an error, it will stop parsing the script at that point and refuse to go any further.

##Responsibility

JavaScript gave web designers the power to create websites that were slicker, smoother, and more reactive. The same technology also gave web designers the power to create websites that were sluggish, unwieldy, and more difficult to use.

One of the earliest abuses of JavaScript came (unsurprisingly) from the advertising industry, a business whose very raison d'être is often at odds with the goals of people trying to achieve a task as quickly as possible. JavaScript allows you to create new browser windows, something that previously could only be done by the user. A young developer named Ethan Zuckerman realised that he could spawn a new window with an advertisement in it. That allowed advertisers to put their message in front of website visitors. Not only that, but JavaScript could be used to spawn multiple windows, some of them visible, some of them hidden behind the current window. It was a fiendish solution.

Twenty years later, Zuckerman wrote:

> I wrote the code to launch the window and run an ad in it. I’m sorry.

Pop-up (and pop-under) windows became so intolerable that browsers had to provide people with a means to block them.

The advertising industry later found other ways to abuse JavaScript. Ad-supported online publishers injected bloated and inefficient JavaScript into their pages, making them slow to load. JavaScript was also used to track people from site to site. People reached for ad-blocking software to combat this treatment. Eventually ad blocking was built into browsers and operating systems to give us the ability to battle excessive JavaScript.

Web designers would do well to remember what the advertising industry chose to ignore: on the web, the user has the final say.

##2.0

The rise of JavaScript was boosted in 2005 with the publication of an article entitled _Ajax: A New Approach to Web Applications_ by Jesse James Garrett. The article put a name to a technique that was gaining popularity. Using a specific subset of JavaScript, it was possible for a web browser to send and receive data from a web server without refreshing the whole page. The result was a smoother user experience.

The term Ajax was coined at the same time as another neologism was in the ascendent. Tim O'Reilly used the phrase Web 2.0 to describe a new wave of web products and services. Unlike Ajax, it was difficult to pin down a definition of Web 2.0. For business people, it meant new business models. For graphic designers, it meant rounded corners and gradients. For developers, it meant JavaScript and Ajax.

Whatever its exact meaning, the term Web 2.0 captured a mood and a feeling. Everything was going to be different now. The old ways of thinking about building for the web could be cast aside. Treating the web as a limitless collection of hyperlinked documents was passé. The age of web apps was at hand.

##Appiness

In the 1964 supreme court case Jacobellis versus Ohio, Justice Potter Stewart provided this definition of obscenity:

> I know it when I see it.

The same could be said for Web 2.0, or for the term "web app". We can all point to examples of web apps, but it's trickier to provide a definition for the term. Web apps allow people to create, edit, and delete content. But these tasks were common long before web apps arrived. People could fill in forms and submit them to a web server for processing. Ajax removed the necessity for that round trip to the server.

Perhaps the definition of a web app requires some circular reasoning:

* JavaScript is a requirement for a web app, and
* a web app is a website that requires JavaScript to work.

In that case, building web apps depends on a fundamental assumption: JavaScript must be available and reliable. But because of its imperative nature, JavaScript is inherently more fragile than a declarative language like HTML. Relying on JavaScript might not be such a safe assumption after all.

##Unforgiven

HTML's loose error-handling allowed it to grow in power over time. It also ensured that the language was easy to learn. Even if you made a mistake, the browser's implementation of Postel's Law ensured that you'd still get a result. Surprisingly, there was an attempt to remove this superpower from HTML.

After the standardisation of HTML version 4 in 1999, the World Wide Web Consortium published XHTML 1.0. This reformulated HTML according to the rules of the XML data format. Whereas HTML can have uppercase or lowercase tag names and attributes, XML requires them to be all lowercase. There were some other differences: all attributes had to be quoted, and standalone elements like IMG or BR required a closing slash.

XHTML 1.0 didn't add any new features to the language. It was simply a stricter way of writing markup. XHTML 2.0 was a different proposition. Not only would it remove established elements like IMG, it would also implement XML's draconian error-handling model. If there is a single error in an XML document—one unquoted attribute or missing closing slash—then the parser should stop immediately and refuse to render anything.

XHTML 2.0 died on the vine. Its theoretical purity was roundly rejected by the people who actually made websites for a living. Web designers rightly refused to publish in a format that would fail completely instead of trying to recover from an error.

Strange then, that years later, web designers would happily create entire websites using JavaScript, a language that shares XML's unforgiving error-handling model. They didn't call them websites. They called them web apps. That distinction was cold comfort to someone who couldn't complete their task because a service relied on JavaScript for crucial functionality.

Despite JavaScript's fragile error-handling model, web designers became more reliant on JavaScript over time. In 2015, NASA relaunched its website as a web app. If you wanted to read the latest news of the agency's space exploration efforts, you first had to download and execute three megabytes of JavaScript. This content—text and images—could have been delivered in the HTML, but the developers decided to use Ajax to retrieve this data instead. Until all that JavaScript was loaded, parsed, and executed, visitors to the site were left staring at a black background. Perhaps this was intended as a demonstration of the vast lonely emptiness of space.

This highlights another difference between HTML and JavaScript. Whereas HTML can be rendered piece by piece as it is downloaded, a JavaScript file must be downloaded in its entirety before its contents can be parsed. While it's tempting to think that only a small minority of visitors will miss out on a site's JavaScript, the truth is that everybody is a non-JavaScript user until the JavaScript has finished loading ...*if* the JavaScript finishes loading. Flaky connections, interfering network operators, and unpredictable ad-blocking software can torpedo the assumption that JavaScript will always be available.

The problem is not with people deliberately disabling JavaScript in their browsers. Although that's a use case worth considering, it's not the most common cause of JavaScript errors. Stuart Langridge put together a list of all the potential points of failure under the title _Everyone has JavaScript, right?_

> The user requests your web app. Has the page loaded yet? Did the HTTP request for the JavaScript succeed? Did the HTTP request for the JavaScript complete? Does the corporate firewall block JavaScript? Does their ISP or mobile operator interfere with downloaded JavaScript? Have they switched off JavaScript? Do they have add-ons or plug-ins installed which inject script or alter the DOM in ways you didn't anticipate? Is the Content Delivery Network up? Does their browser support the JavaScript you've written?

Many of those problems would also affect HTML and CSS files, but because of Postel's Law, they can recover gracefully.

This doesn't mean that web designers shouldn't use JavaScript. But it does mean that web designers shouldn't *rely* on JavaScript when a simpler solution exists.

##Platform

Web designers who ignored the message of John Allsopp's _A Dao of Web Design_ made the mistake of treating the web like print. The history of print has much to offer—hierarchy, typography, colour theory—but the web is a fundamentally different medium. The history of software development also has much to offer—architecture, testing, process—but again, the web remains its own medium.

It's tempting to apply the knowledge and learnings from another medium to the web. But it is more structurally honest to uncover the web's own unique strengths and weaknesses.

The language we use can subtly influence our thinking. In his book _Metaphors We Live By_, George Lakoff highlights the dangers of political language. Obvious examples are "friendly fire" and "collateral damage", but a more insidious example is "tax relief"—before a debate has even begun, taxation has been framed as something requiring relief.

On the face of it, the term "web platform" seems harmless. Describing the web as a platform puts it on par with other software environments. Flash was a platform. Android is a platform. iOS is a platform. But the web is not a platform. The whole point of the web is that it is *cross*-platform.

A platform provides a controlled runtime environment for software. As long as the user has that runtime environment, you can be confident that they will get exactly what you've designed. If you build an iOS app and someone has an iOS device, you know that they will get 100% of your software. But if you build an iOS app and someone has an Android device, they will get 0% of your software. You can't install an iOS app on an Android device. It's all or nothing.

The web isn't as binary as that. If you build something using web technologies, and someone visits with a web browser, you can't be sure how many of the web technologies will be supported. It probably won't be 100%. But it's also unlikely to be 0%. Some people will visit with iOS devices. Others will visit with Android devices. Some people will get 80% or 90% of what you've designed. Others will get just 20%, 30%, or 50%. The web isn't a platform. It's a continuum.

Thinking of the web as a platform is a category error. A platform like Flash, iOS, or Android provides stability and certainty, but only under a very specific set of circumstances—your software must be accessed with the right platform-specific runtime environment. The web provides no such certainty, but it also doesn't restrict the possible runtime environments.

Platforms are controlled and predictable. The World Wide Web is chaotic and unpredictable.

The web is a hot mess.