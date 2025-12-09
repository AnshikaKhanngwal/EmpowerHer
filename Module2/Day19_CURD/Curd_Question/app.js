// --- Firebase Config ---
const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME",
  projectId: "REPLACE_ME",
  storageBucket: "REPLACE_ME",
  messagingSenderId: "REPLACE_ME",
  appId: "REPLACE_ME"
};

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js'
import { getFirestore, collection, addDoc, doc, onSnapshot, updateDoc, deleteDoc, query, getDocs, limit } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const booksCol = collection(db, 'books')

const grid = document.getElementById('grid')
const empty = document.getElementById('empty')
const addForm = document.getElementById('addBookForm')
const seedBtn = document.getElementById('seedBtn')
const clearBtn = document.getElementById('clearBtn')
const modalRoot = document.getElementById('modalRoot')
const search = document.getElementById('search')

let books = []

function renderBooks(list){
  grid.innerHTML = ''
  if(!list.length){ empty.style.display='block'; return }
  empty.style.display='none'

  list.forEach(b => {
    const card = document.createElement('div'); card.className='card'
    const img = document.createElement('img'); img.src = b.coverImageURL || ''
    img.onerror = () => { img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23e5e7eb"/></svg>' }
    const body = document.createElement('div'); body.className='body'
    const title = document.createElement('div'); title.className='title'; title.textContent = b.title
    const author = document.createElement('div'); author.className='author'; author.textContent = 'By ' + b.author
    const price = document.createElement('div'); price.className='price'; price.textContent = '₹' + b.price

    const actions = document.createElement('div'); actions.className='actions'
    const view = document.createElement('button'); view.className='outline'; view.textContent='View Details'
    const upd = document.createElement('button'); upd.className='outline'; upd.textContent='Update Author'
    const del = document.createElement('button'); del.className='outline'; del.textContent='Delete'

    view.onclick = () => showModal(b)
    upd.onclick = async () => {
      const newAuthor = prompt('Enter new author name', b.author)
      if(newAuthor && newAuthor.trim()!==b.author){
        const d = doc(db,'books',b.id)
        await updateDoc(d,{author:newAuthor.trim()})
      }
    }
    del.onclick = async () => {
      if(confirm('Delete this book?')){
        await deleteDoc(doc(db,'books',b.id))
      }
    }

    actions.append(view, upd, del)
    body.append(title, author, price, actions)
    card.append(img, body)
    grid.appendChild(card)
  })
}

function showModal(book){
  modalRoot.innerHTML = ''
  const backdrop = document.createElement('div'); backdrop.className='modal-backdrop'
  const modal = document.createElement('div'); modal.className='modal'
  modal.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <h3 style="margin:0">${escapeHtml(book.title)}</h3>
      <button id="closeBtn">✕</button>
    </div>
    <img src="${escapeHtml(book.coverImageURL)}" style="width:100%;height:220px;object-fit:cover;border-radius:8px;margin-bottom:10px" onerror="this.style.display='none'" />
    <div class="small">Author: <strong>${escapeHtml(book.author)}</strong></div>
    <div class="small">Price: <strong>₹${escapeHtml(String(book.price))}</strong></div>
  `
  backdrop.appendChild(modal)
  modalRoot.appendChild(backdrop)
  modalRoot.style.display='block'

  const closeBtn = document.getElementById('closeBtn')
  closeBtn.onclick = () => { modalRoot.style.display='none'; modalRoot.innerHTML='' }
  backdrop.onclick = (e)=>{ if(e.target===backdrop){ modalRoot.style.display='none'; modalRoot.innerHTML='' } }
}

function escapeHtml(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;') }

onSnapshot(booksCol, snap=>{
  books = snap.docs.map(d=>({id:d.id, ...d.data()}))
  applySearchAndRender()
})

addForm.addEventListener('submit', async (e)=>{
  e.preventDefault()
  const title = document.getElementById('title').value.trim()
  const author = document.getElementById('author').value.trim()
  const price = Number(document.getElementById('price').value) || 0
  const image = document.getElementById('image').value.trim()
  try{
    await addDoc(booksCol,{ title, author, price, coverImageURL: image })
    addForm.reset()
  }catch(err){ console.error(err); alert('Failed to add book') }
})

seedBtn.addEventListener('click', async ()=>{
  const sample = [
    { title:'Atomic Habits', author:'James Clear', price:299, coverImageURL:'https://images-na.ssl-images-amazon.com/images/I/51-uspgqWIL._SX329_BO1,204,203,200_.jpg' },
    { title:'The Alchemist', author:'Paulo Coelho', price:199, coverImageURL:'https://images-na.ssl-images-amazon.com/images/I/51Z0nLAfLmL._SX324_BO1,204,203,200_.jpg' },
    { title:'Clean Code', author:'Robert C. Martin', price:399, coverImageURL:'https://m.media-amazon.com/images/I/41xShlnTZTL.jpg' },
    { title:'Deep Work', author:'Cal Newport', price:249, coverImageURL:'https://images-na.ssl-images-amazon.com/images/I/41XKQ7s6f6L._SX331_BO1,204,203,200_.jpg' },
    { title:'Hooked', author:'Nir Eyal', price:349, coverImageURL:'https://images-na.ssl-images-amazon.com/images/I/41K8GZ2YJRL._SX331_BO1,204,203,200_.jpg' }
  ]

  try{
    const q = query(booksCol, limit(1))
    const snap = await getDocs(q)
    if(!snap.empty){ if(!confirm('Books already exist. Do you still want to add sample books (may duplicate)?')) return }

    for(const b of sample){ await addDoc(booksCol,b) }
  }catch(err){ console.error(err); alert('Failed to seed') }
})

clearBtn.addEventListener('click', async ()=>{
  if(!confirm('Delete ALL books from Firestore? This action cannot be undone.')) return
  try{
    const all = await getDocs(booksCol)
    const promises = all.docs.map(d=>deleteDoc(doc(db,'books',d.id)))
    await Promise.all(promises)
  }catch(err){ console.error(err); alert('Failed to clear') }
})

search.addEventListener('input', ()=>applySearchAndRender())
function applySearchAndRender(){
  const q = search.value.trim().toLowerCase()
  if(!q) return renderBooks(books)
  const filtered = books.filter(b=> (b.title||'').toLowerCase().includes(q) || (b.author||'').toLowerCase().includes(q))
  renderBooks(filtered)
}
