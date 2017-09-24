'use strict'

const item = {
  id: 1,
  label: 'Work',
  url: '#/work',
  items: []
}

const items = [
  item,
  extend(item, {id: 2, label: 'About', url: '#/about', items: [{label: 'What we do', url: '#/about/whatwedo'}]}),
  extend(item, {id: 3, label: 'Careers', url: '#/careers'}),
  extend(item, {id: 4, label: 'Ideas', url: '#/ideas'})
]

// Clonamos el objeto y agregamos nuevos valores
function extend (obj, values) {
  const clone = Object.assign({}, obj);
  return Object.assign(clone, values);
}

module.exports = {
  single: item,
  all: items,
  byMultipleItem: item => items.filter(a => a.items.length > 0).shift(),
  bySingleItem: item => items.filter(a => a.items.length === 0).shift()
}