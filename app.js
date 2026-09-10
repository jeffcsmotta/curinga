/**
 * Curinga Cozinha Personalizada
 * Cardápio Digital & Sistema de Pedidos Direto no WhatsApp
 * Congelados Artesanais — Feito com amor, tempero e personalidade.
 * Powered by Onira Labs
 */

// WhatsApp Oficial da Curinga Cozinha Personalizada
const WHATSAPP_PHONE = '5554991018416';

// Catálogo Real — Cardápio Oficial da Curinga (9 Produtos Congelados + 3 Encomendas)
const PRODUCTS = [
    {
        id: 'curinga-001',
        name: 'Creme de Aspargos',
        category: 'cremes',
        group: 'Cremes & Sopas',
        desc: 'Creme aveludado de aspargos frescos, preparado artesanalmente com temperos selecionados. Produto congelado, pronta entrega.',
        badge: 'Pronta Entrega',
        img: 'assets/produtos/creme_aspargos.jpg',
        price: 30.00
    },
    {
        id: 'curinga-002',
        name: 'Ragu de Carne de Panela',
        category: 'molhos',
        group: 'Molhos & Ragus',
        desc: 'Ragu rústico de carne de panela cozida lentamente, com molho encorpado de tomate e ervas. Produto congelado, pronta entrega.',
        badge: 'Pronta Entrega',
        img: 'assets/produtos/ragu_carne.jpg',
        price: 30.00
    },
    {
        id: 'curinga-003',
        name: 'Creme de Aipim com Bacon',
        category: 'cremes',
        group: 'Cremes & Sopas',
        desc: 'Creme saboroso e encorpado de aipim com pedaços crocantes de bacon dourado. Produto congelado, pronta entrega.',
        badge: 'Pronta Entrega',
        img: 'assets/produtos/creme_aipim_bacon.jpg',
        price: 25.00
    },
    {
        id: 'curinga-004',
        name: 'Creme de Aipim',
        category: 'cremes',
        group: 'Cremes & Sopas',
        desc: 'Creme suave e reconfortante de aipim puro, feito com temperos caseiros naturais. Produto congelado, pronta entrega.',
        badge: 'Pronta Entrega',
        img: 'assets/produtos/creme_aipim.jpg',
        price: 20.00
    },
    {
        id: 'curinga-005',
        name: 'Molho de Queijo',
        category: 'molhos',
        group: 'Molhos & Ragus',
        desc: 'Molho cremoso de queijo para massas, gratinados e acompanhamentos. Produto congelado, pronta entrega.',
        badge: 'Pronta Entrega',
        img: 'assets/produtos/molho_queijo.jpg',
        price: 30.00
    },
    {
        id: 'curinga-006',
        name: 'Molho Pesto Tradicional',
        category: 'molhos',
        group: 'Molhos & Ragus',
        desc: 'Molho pesto artesanal de manjericão fresco com azeite de oliva extra virgem e nozes. Produto congelado, pronta entrega.',
        badge: 'Especial',
        img: 'assets/produtos/molho_pesto.jpg',
        price: 40.00
    },
    {
        id: 'curinga-007',
        name: 'Molho de Cogumelos',
        category: 'molhos',
        group: 'Molhos & Ragus',
        desc: 'Molho aveludado de cogumelos frescos com ervas aromáticas. Produto congelado, pronta entrega.',
        badge: 'Pronta Entrega',
        img: 'assets/produtos/molho_cogumelos.jpg',
        price: 30.00
    },
    {
        id: 'curinga-008',
        name: 'Molho Pomodoro Caseiro',
        category: 'molhos',
        group: 'Molhos & Ragus',
        desc: 'Molho clássico de tomate, apurado lentamente com manjericão fresco e azeite. Produto congelado, pronta entrega.',
        badge: 'Pronta Entrega',
        img: 'assets/produtos/molho_pomodoro.jpg',
        price: 25.00
    },
    {
        id: 'curinga-009',
        name: 'Caldo de Ossos Concentrado',
        category: 'caldos',
        group: 'Caldos',
        desc: 'Caldo nutritivo de ossos bovinos cozido lentamente por horas, rico em colágeno. Produto congelado, pronta entrega.',
        badge: 'Pronta Entrega',
        img: 'assets/produtos/caldo_ossos.jpg',
        price: 12.00
    }
];

// Categorias do Catálogo
const DEFAULT_CATEGORIES = [
    { id: 'todos', name: 'Todos os Sabores', icon: 'utensils' },
    { id: 'cremes', name: 'Cremes & Sopas', icon: 'soup' },
    { id: 'molhos', name: 'Molhos & Ragus', icon: 'flame' },
    { id: 'caldos', name: 'Caldos Especiais', icon: 'droplets' }
];

// Conceitos por Categoria
const CATEGORY_CONCEPTS = {
    'todos': {
        title: 'Cardápio Completo',
        desc: 'Todos os produtos congelados disponíveis para pronta entrega. Feitos com amor, tempero e personalidade.'
    },
    'cremes': {
        title: 'Cremes & Sopas Artesanais',
        desc: 'Cremes aveludados e reconfortantes, feitos artesanalmente com ingredientes frescos.'
    },
    'molhos': {
        title: 'Molhos & Ragus Caseiros',
        desc: 'Molhos encorpados e saborosos para enriquecer suas massas e pratos do dia a dia.'
    },
    'caldos': {
        title: 'Caldos Nutritivos',
        desc: 'Caldos artesanais cozidos lentamente para máximo sabor e nutrientes.'
    }
};

// Estado da Aplicação
let cart = [];
let selectedPaymentMethod = 'pix';
let activeCategory = 'todos';
let searchQuery = '';
let currentModalProduct = null;
let currentModalQty = 1;

// Utilitários
function formatCurrency(value) {
    return 'R$ ' + value.toFixed(2).replace('.', ',');
}

function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
}

// Persistência do Carrinho
function saveCartToStorage() {
    try {
        localStorage.setItem('curinga_cart', JSON.stringify(cart));
    } catch (e) { /* silent */ }
}

function loadCartFromStorage() {
    try {
        const saved = localStorage.getItem('curinga_cart');
        if (saved) {
            cart = JSON.parse(saved);
            if (!Array.isArray(cart)) cart = [];
        }
    } catch (e) {
        cart = [];
    }
}

// Renderizar Categorias
function renderCategories() {
    const container = document.getElementById('category-nav');
    if (!container) return;

    container.innerHTML = DEFAULT_CATEGORIES.map(cat => {
        const isActive = activeCategory === cat.id;
        return `
            <button type="button" class="cat-pill ${isActive ? 'active' : ''}" data-category="${cat.id}" onclick="window.filterCategory('${cat.id}')">
                <i data-lucide="${cat.icon}" style="width:14px;height:14px;"></i>
                <span>${cat.name}</span>
            </button>
        `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
}

// Filtrar por Categoria
window.filterCategory = function(cat) {
    activeCategory = cat;
    renderCategories();
    renderProducts();
};

// Busca
window.handleSearch = function(event) {
    searchQuery = event.target.value.toLowerCase().trim();
    renderProducts();
    const clearBtn = document.getElementById('btn-clear-search');
    if (clearBtn) clearBtn.style.display = searchQuery ? 'block' : 'none';
};

window.clearSearch = function() {
    const input = document.getElementById('search-input');
    if (input) input.value = '';
    searchQuery = '';
    renderProducts();
    const clearBtn = document.getElementById('btn-clear-search');
    if (clearBtn) clearBtn.style.display = 'none';
};

// Renderizar Produtos
function renderProducts() {
    const catalogGrid = document.getElementById('catalog-grid');
    if (!catalogGrid) return;

    let filtered = PRODUCTS.filter(prod => {
        const matchesCategory = activeCategory === 'todos' || prod.category === activeCategory;
        const matchesSearch = !searchQuery ||
            prod.name.toLowerCase().includes(searchQuery) ||
            (prod.desc && prod.desc.toLowerCase().includes(searchQuery));
        return matchesCategory && matchesSearch;
    });

    // Atualizar banner de conceito
    const conceptInfo = CATEGORY_CONCEPTS[activeCategory] || CATEGORY_CONCEPTS['todos'];
    const titleEl = document.getElementById('current-category-name');
    const descEl = document.getElementById('category-concept-desc');
    const countEl = document.getElementById('products-count-badge');

    if (titleEl) titleEl.textContent = searchQuery ? `Busca: "${searchQuery}"` : conceptInfo.title;
    if (descEl) descEl.textContent = searchQuery ? `Mostrando produtos que correspondem ao termo "${searchQuery}".` : conceptInfo.desc;
    if (countEl) countEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'produto' : 'produtos'}`;

    if (filtered.length === 0) {
        catalogGrid.innerHTML = `
            <div class="empty-catalog-msg">
                <i data-lucide="search-x" style="width:40px;height:40px;color:var(--text-muted);"></i>
                <p>Nenhum produto encontrado.</p>
                <button class="btn-clean-filter" onclick="window.filterCategory('todos'); window.clearSearch();">Ver todos os produtos</button>
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
    }

    catalogGrid.innerHTML = filtered.map(prod => {
        const priceFormatted = formatCurrency(prod.price);
        const badgeClass = prod.badge === 'Especial' ? 'badge-destaque' : 'badge-congelado';

        return `
            <article class="menu-card" data-id="${prod.id}">
                <div class="card-img-box" onclick="window.openProductModal('${prod.id}')">
                    <img src="${prod.img}" alt="${prod.name}" class="card-img" loading="lazy">
                    ${prod.badge ? `<span class="card-badge ${badgeClass}">${prod.badge}</span>` : ''}
                </div>
                <div class="card-body">
                    <div class="card-title-row" onclick="window.openProductModal('${prod.id}')">
                        <h3 class="card-title">${prod.name}</h3>
                    </div>
                    <p class="card-desc" onclick="window.openProductModal('${prod.id}')">${prod.desc || ''}</p>
                    <div class="card-bottom">
                        <div class="card-price-block" onclick="window.openProductModal('${prod.id}')">
                            <span class="price-label">Preço:</span>
                            <span class="price-value">${priceFormatted}</span>
                        </div>
                        <button type="button" class="btn-add-item" onclick="event.stopPropagation(); window.openProductModal('${prod.id}')" aria-label="Adicionar ${prod.name}">
                            <i data-lucide="plus" style="width:14px;height:14px;"></i>
                            <span>Pedir</span>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
}

// Modal de Produto
window.openProductModal = function(productId) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    currentModalProduct = prod;
    currentModalQty = 1;

    const modal = document.getElementById('product-modal');
    if (!modal) return;

    const imgEl = document.getElementById('modal-img');
    if (imgEl) {
        imgEl.src = prod.img;
        imgEl.alt = prod.name;
    }
    const titleEl = document.getElementById('modal-title');
    if (titleEl) titleEl.textContent = prod.name;

    const descEl = document.getElementById('modal-desc');
    if (descEl) descEl.textContent = prod.desc;

    const priceEl = document.getElementById('modal-price');
    if (priceEl) priceEl.textContent = formatCurrency(prod.price);

    const qtyEl = document.getElementById('modal-qty-value');
    if (qtyEl) qtyEl.textContent = '1';

    const obsInput = document.getElementById('modal-obs');
    if (obsInput) obsInput.value = '';

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (window.lucide) window.lucide.createIcons();
};

window.closeProductModal = function() {
    const modal = document.getElementById('product-modal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
    currentModalProduct = null;
};

window.changeModalQty = function(delta) {
    currentModalQty = Math.max(1, currentModalQty + delta);
    const el = document.getElementById('modal-qty-value');
    if (el) el.textContent = currentModalQty;
    if (currentModalProduct) {
        const priceEl = document.getElementById('modal-price');
        if (priceEl) priceEl.textContent = formatCurrency(currentModalProduct.price * currentModalQty);
    }
};

window.addToCartFromModal = function() {
    if (!currentModalProduct) return;

    const obsInput = document.getElementById('modal-obs');
    const obs = obsInput ? obsInput.value.trim() : '';

    const existingIndex = cart.findIndex(item => item.id === currentModalProduct.id && item.obs === obs);
    if (existingIndex > -1) {
        cart[existingIndex].qty += currentModalQty;
    } else {
        cart.push({
            id: currentModalProduct.id,
            name: currentModalProduct.name,
            price: currentModalProduct.price,
            img: currentModalProduct.img,
            qty: currentModalQty,
            obs: obs
        });
    }

    saveCartToStorage();
    updateCartUI();
    closeProductModal();
    showToast(`✓ ${currentModalProduct.name} adicionado ao pedido!`);
};

// Gerenciamento do Carrinho
window.openCart = function() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
};

window.closeCart = function() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
};

window.changeCartItemQty = function(index, delta) {
    if (!cart[index]) return;
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    saveCartToStorage();
    updateCartUI();
};

window.clearCart = function() {
    if (cart.length === 0) return;
    cart = [];
    saveCartToStorage();
    updateCartUI();
    showToast('Pedido limpo.');
};

window.setPaymentMethod = function(method) {
    selectedPaymentMethod = method;
    document.querySelectorAll('.pay-method-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.method === method);
    });
    const trocoBox = document.getElementById('troco-input-box');
    if (trocoBox) {
        trocoBox.style.display = method === 'dinheiro' ? 'block' : 'none';
    }
};

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const subtotalFormatted = formatCurrency(subtotal);

    // Header Cart Controls
    const cartCountEl = document.getElementById('cart-count');
    const cartTotalNavEl = document.getElementById('cart-total-nav');
    const cartNavBtn = document.getElementById('btn-cart-nav');

    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
    }
    if (cartTotalNavEl) {
        cartTotalNavEl.textContent = subtotalFormatted;
    }
    if (cartNavBtn) {
        cartNavBtn.classList.toggle('has-items', totalItems > 0);
    }

    // Floating Bar (Mobile)
    const floatingBar = document.getElementById('cart-floating-bar');
    const floatingCount = document.getElementById('floating-cart-count');
    const floatingTotal = document.getElementById('floating-cart-total');

    if (floatingBar) {
        floatingBar.classList.toggle('visible', totalItems > 0);
    }
    if (floatingCount) {
        floatingCount.textContent = totalItems === 1 ? '1 item' : `${totalItems} itens`;
    }
    if (floatingTotal) {
        floatingTotal.textContent = subtotalFormatted;
    }

    // Cart Drawer Items List
    renderCartItems();

    // Cart Drawer Totals
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const totalEl = document.getElementById('cart-total-val');
    if (subtotalEl) subtotalEl.textContent = subtotalFormatted;
    if (totalEl) totalEl.textContent = subtotalFormatted;
}

function renderCartItems() {
    const list = document.getElementById('cart-items-list');
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = `
            <div class="cart-empty-state">
                <i data-lucide="shopping-bag"></i>
                <p>Seu pedido está vazio.</p>
                <p style="font-size:0.78rem;margin-top:4px;">Escolha cremes, molhos e caldos para começar.</p>
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
    }

    list.innerHTML = cart.map((item, index) => {
        const itemTotal = formatCurrency(item.price * item.qty);
        return `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    ${item.obs ? `<div class="cart-item-obs">Obs: ${item.obs}</div>` : ''}
                    <div class="cart-item-price">${itemTotal}</div>
                </div>
                <div class="cart-item-actions">
                    <button type="button" class="btn-cart-qty" onclick="window.changeCartItemQty(${index}, -1)">−</button>
                    <span style="font-size:0.86rem;font-weight:700;min-width:18px;text-align:center;">${item.qty}</span>
                    <button type="button" class="btn-cart-qty" onclick="window.changeCartItemQty(${index}, 1)">+</button>
                </div>
            </div>
        `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
}

// Enviar Pedido via WhatsApp
window.submitOrderToWhatsApp = function() {
    if (cart.length === 0) {
        alert('Seu pedido está vazio! Adicione ao menos um item antes de enviar.');
        return;
    }

    const clientNameInput = document.getElementById('client-name');
    const clientName = clientNameInput ? clientNameInput.value.trim() : '';

    const trocoInput = document.getElementById('troco-val');
    const trocoVal = trocoInput ? trocoInput.value.trim() : '';

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const subtotalFormatted = formatCurrency(subtotal);

    let payText = 'Pix';
    if (selectedPaymentMethod === 'cartao') payText = 'Cartão';
    if (selectedPaymentMethod === 'dinheiro') {
        payText = trocoVal ? `Dinheiro (Troco para ${trocoVal})` : 'Dinheiro';
    }

    let msg = `Olá! Gostaria de fazer um pedido na *Curinga Cozinha Personalizada*:

`;

    cart.forEach(item => {
        const itemTotal = formatCurrency(item.price * item.qty);
        msg += `▪ ${item.qty}x *${item.name}* — ${itemTotal}
`;
        if (item.obs) {
            msg += `   _Obs: ${item.obs}_
`;
        }
    });

    msg += `
*Total:* ${subtotalFormatted}`;
    msg += `
*Pagamento:* ${payText}`;

    if (clientName) {
        msg += `
*Cliente:* ${clientName}`;
    }

    msg += `

_Pedido gerado pelo cardápio digital da Curinga Cozinha._`;

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
    window.open(url, '_blank');
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    renderCategories();
    renderProducts();
    updateCartUI();
});
