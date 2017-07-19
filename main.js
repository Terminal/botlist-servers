onresize = () => {
	document.body.style.width = `${window.innerWidth}px`;
	document.body.style.height = `${window.innerHeight}px`;
};
onresize();

Object.keyValueForEach = function(obj, func){
    Object.keys(obj).map(o=>{
        func(o,obj[o]);
    });
}

let BLS = {
	addIndexEntry: (title, subtitle, index, icon = "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png") => {
		document.querySelector(".index").innerHTML += `<div class="entry" data-index="${index}"><img src="${icon}"><div><span class="name">${title}</span><span class="name small">${subtitle}</span></div></div>`
	},

	addServerEntry: (title, subtitle, index, icon = "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png") => {
		document.querySelector(".servers").innerHTML += `<div class="entry" data-index="${index}"><img src="${icon}"><div><span class="name">${title}</span><span class="name small">${subtitle}</span></div></div>`
	},

	renderServerEntry: (title, subtitle, index, icon = "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png") => {
		return `<div class="entry" data-index="${index}"><img src="${icon}"><div><span class="name">${title}</span><span class="name small">${subtitle}</span></div></div>`
	},

	writeEntryInfo: entry => {
		document.querySelector(".entrytable").innerHTML = `<tbody>
      <tr><th>Name</th><td>${entry.name}</td></tr>
      <tr><th>Description</th><td>${entry.description}</td></tr>
      <tr><th>Definition</th><td>${entry.def}</td></tr>
      <tr><th>Author</th><td>${entry.author}</td></tr>
      <tr><th>Scan Date</th><td>${entry.date}</td></tr>
      <tr><th>Link</th><td><a class="link" target="_blank" href="${entry.entry_info_link}">${entry.entry_info_link}</a></td></tr>
      <tr><th>JSON File</th><td><a class="link" target="_blank" href="${entry.link}">${entry.link}</a></td></tr></tbody>`
	},

	buildFullInfo: (entry, guild) => {
		let dombuild = [`<table class="tasteless"><tbody>`];
		Object.keyValueForEach(entry.disect.full_info, (k,v) => {
			dombuild.push(`<tr><th>${Mustache.render(k, guild)}</th><td>${Mustache.render(v, guild)}</td></tr>`);
		});
		dombuild.push(`</tbody></table>`);
		document.querySelector(".fullinfo").innerHTML = dombuild.join("");
	},

	entryLinkObjects: {},

	fetchLink: (link, index) => {
		return new Promise((resolve, reject) => {
			if(BLS.entryLinkObjects[index]){
				resolve(BLS.entryLinkObjects[index]);
			}else{
				fetch(link).then(res => res.json()).then(json => {
					BLS.entryLinkObjects[index] = json;
					resolve(json);
				});
			}
		});
	},

	nonce: Date.now().toString(36)
}

const DomManager = {
	findEntryDom: e => {
		if(e.classList.contains("entry")) return e;
		const parents = DomManager.listParents(e);
		for(let i in parents){
			let p = parents[i];
			if(p instanceof HTMLDivElement && p.classList.contains("entry")){
				return p
			}
		}
		return null;
	},

	listParents: e => {
		let list = [];
		let iterate = parent => {
			if(parent !== null && parent.parentNode !== null){
				list.push(parent.parentNode);
				iterate(parent.parentNode);
			}
		}
		iterate(e);
		return list;
	}
}

onmousedown = e => {
	// entry
	let entry = DomManager.findEntryDom(e.target);
	if(entry) {
		if(document.querySelector(`.${entry.parentNode.classList[1]} .entry.selected`)) document.querySelector(`.${entry.parentNode.classList[1]} .entry.selected`).classList.remove("selected");
		entry.classList.add("selected");
		switch(entry.parentNode.classList[1]){
			case "index":
				entryJson = BLS.json[parseInt(entry.dataset.index)];
				BLS.writeEntryInfo(entryJson);
				BLS.entryLinkObjects = {};
				console.log(entryJson);
				nonce = Date.now().toString(36);
				if(BLS.controller) BLS.controller.destroy(true);
				if(BLS.scene) BLS.scene.destroy(true);
				BLS.offset = 0;
				BLS.nonce = nonce;
				document.querySelector('.servers').innerHTML = "";
				document.querySelector('.fullinfo').innerHTML = "";
				BLS.fetchLink(entryJson.link, parseInt(entry.dataset.index)).then(json => {
					console.log(json);
					doms = json.map(guild =>  BLS.renderServerEntry(
						Mustache.render(entryJson.disect.entry.title, guild),
						Mustache.render(entryJson.disect.entry.subtitle, guild),
						json.indexOf(guild),
						entryJson.disect.entry.icon !== "" ? Mustache.render(entryJson.disect.entry.icon, guild) : undefined
					));
					ogdoms = doms;
					loadservers = (start, count) => doms.splice(start, count).map(guild => $(guild).insertBefore('.servers #loader'));
					BLS.controller = new ScrollMagic.Controller();
					document.querySelector(".servers").innerHTML += `<div id="loader"><span class="loading-text"></span></div>`
					BLS.scene = new ScrollMagic.Scene({triggerElement: ".servers #loader", triggerHook: "onEnter"})
					.addTo(BLS.controller)
					.on("enter", function (e) {
						if (!$("#loader").hasClass("active")) {
							$("#loader").addClass("active");
							if (console){
								console.log("loading new items");
							}
							loadservers(BLS.offset, 50);
							doms = ogdoms;
							BLS.offset += 50;
							$("#loader").removeClass("active");
						}
					});

				}).catch(e => console.error("Failed to grab data", e));
				break;
			case "servers":
				entryJson = BLS.json[parseInt(document.querySelector('.index .entry.selected').dataset.index)];
				BLS.fetchLink(entryJson.link, parseInt(document.querySelector('.index .entry.selected').dataset.index)).then(json => {
					guildJson = json[parseInt(entry.dataset.index)];
					console.log(guildJson);
					BLS.buildFullInfo(entryJson, guildJson);
				}).catch(e => console.error("Failed to grab data", e));
				break;
		}
	}
	// entry.dataset.index
	// definitions
	if(e.target.classList.contains('defbtn')){
		let table = document.querySelector('.deftable')
		if(table.classList.contains('hidden')) table.classList.remove('hidden');
			else table.classList.add('hidden');
	}

	// entry info
	if(e.target.classList.contains('entrybtn')){
		let table = document.querySelector('.entrytable')
		if(table.classList.contains('hidden')) table.classList.remove('hidden');
			else table.classList.add('hidden');
	}
}

onload = () => {
	fetch('https://rawgit.com/Terminal/botlist-servers/master/website-template.json').then(res => res.json()).then(json => {
		console.log(json);
		document.querySelector(".index").removeChild(document.querySelector(".index .loading-text"));
		json.map(entry => BLS.addIndexEntry(entry.name, entry.date, json.indexOf(entry), entry.icon === "" ? undefined : entry.icon));
		BLS.json = json;
	});
}