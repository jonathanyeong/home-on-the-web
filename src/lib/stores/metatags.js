import { Writable, writable } from 'svelte/store'

const initialTags = {
    title: '',
    description: '',
    type: 'website',
    image: '',
    "twitter:title": '',
    "twitter:description": '',
    "twitter:card": '',
    "twitter:image": '',
    "twitter:url": '',
    "og:title": '',
    "og:description": '',
    "og:type": 'website',
    "og:url": ''
}


function createMetaTagsStore() {
  const { subscribe, set, update } = writable(initialTags)
  const title = (title) => update(curr => ({...curr, title: title, "og:title": title, 'twitter:title': title}))
  const desc = (desc) => update(curr => ({...curr, description: desc, "og:description": desc, 'twitter:description': desc}))
  const url = (url) => update(curr => ({...curr, "og:url": url, 'twitter:url': url}))
  const type = (type) => update(curr => ({...curr, type: type}))
  return {
    subscribe,
    set,
    url,
    title,
    desc,
    type
  }
};

const store = createMetaTagsStore();

export default store;
