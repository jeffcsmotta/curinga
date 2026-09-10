/**
 * Curinga Cozinha Personalizada
 * Card├ípio Digital & Sistema de Pedidos Direto no WhatsApp
 * Congelados Artesanais com Personalidade ÔÇö Feito com amor, tempero e personalidade.
 * Powered by Onira Labs
 */

// WhatsApp Oficial da Curinga Cozinha Personalizada
const WHATSAPP_PHONE = '5554991018416';

// Cat├ílogo Real ÔÇö Card├ípio Oficial da Curinga (9 Produtos Congelados + 3 Encomendas)
const PRODUCTS = [
    {
        id: 'curinga-001',
        name: 'Creme de Aspargos',
        category: 'cremes',
        group: 'Cremes & Sopas',
        desc: 'Creme aveludado de aspargos frescos, preparado artesanalmente com temperos selecionados. Produto congelado, pronta entrega.',
        badge: 'Pronta Entrega ÔØä´©Å',
        img: 'assets/produtos/creme_aspargos.jpg',
        price: 30.00,
        hasAdicionais: false
    },
    {
        id: 'curinga-002',
        name: 'Ragu de Carne de Panela',
        category: 'molhos',
        group: 'Molhos & Ragus',
        desc: 'Ragu r├║stico de carne de panela cozida lentamente, com molho encorpado de tomate e ervas. Produto congelado, pronta entrega.',
        badge: 'Pronta Entrega ÔØä´©Å',
        img: 'assets/produtos/ragu_carne.jpg',
        price: 30.00,
        hasAdicionais: false
    },
    {
        id: 'curinga-003',
        name: 'Creme de Aipim com Bacon',
        category: 'cremes',
        group: 'Cremes & Sopas',
        desc: 'Creme cremoso de aipim (mandioca) com peda├ºos crocantes de bacon. Produto congelado, pronta entrega.',
        badge: 'Pronta Entrega ÔØä´©Å',
        img: 'assets/produtos/creme_aipim_bacon.jpg',
        price: 25.00,
        hasAdicionais: false
    },
    {
        id: 'curinga-004',
        name: 'Creme de Aipim',
        category: 'cremes',
        group: 'Cremes & Sopas',
        desc: 'Creme suave e reconfortante de aipim (mandioca), puro e artesanal. Produto congelado, pronta entrega.',
        badge: 'Pronta Entrega ÔØä´©Å',
        img: 'assets/produtos/creme_aipim.jpg',
        price: 20.00,
        hasAdicionais: false
    },
    {
        id: 'curinga-005',
        name: 'Molho de Queijo',
        category: 'molhos',
        group: 'Molhos & Ragus',
        desc: 'Molho cremoso de queijo para massas, gratinados e acompanhamentos. Produto congelado, pronta entrega.',
        badge: 'Pronta Entrega ÔØä´©Å',
        img: 'assets/produtos/molho_queijo.jpg',
        price: 30.00,
        hasAdicionais: false
    },
    {
        id: 'curinga-006',
        name: 'Molho Pesto',
        category: 'molhos',
        group: 'Molhos & Ragus',
        desc: 'Molho pesto artesanal de manjeric├úo fresco com azeite extra virgem, pinoli e parmes├úo. Produto congelado, pronta entrega.',
        badge: 'Premium Ô¡É',
        img: 'assets/produtos/molho_pesto.jpg',
        price: 40.00,
        hasAdicionais: false
    },
    {
        id: 'curinga-007',
        name: 'Molho de Cogumelos',
        category: 'molhos',
        group: 'Molhos & Ragus',
        desc: 'Molho aveludado de cogumelos selecionados com ervas frescas. Produto congelado, pronta entrega.',
        badge: 'Pronta Entrega ÔØä´©Å',
        img: 'assets/produtos/molho_cogumelos.jpg',
        price: 30.00,
        hasAdicionais: false
    },
    {
        id: 'curinga-008',
        name: 'Molho Pomodoro',
        category: 'molhos',
        group: 'Molhos & Ragus',
        desc: 'Molho cl├íssico de tomate italiano, lento e arom├ítico, com manjeric├úo fresco. Produto congelado, pronta entrega.',
        badge: 'Pronta Entrega ÔØä´©Å',
        img: 'assets/produtos/molho_pomodoro.jpg',
        price: 25.00,
        hasAdicionais: false
    },
    {
        id: 'curinga-009',
        name: 'Caldo de Ossos',
        category: 'caldos',
        group: 'Caldos',
        desc: 'Caldo nutritivo de ossos bovinos cozido por horas, rico em col├ígeno e sabor. Produto congelado, pronta entrega.',
        badge: 'Pronta Entrega ÔØä´©Å',
        img: 'assets/produtos/caldo_ossos.jpg',
        price: 12.00,
        hasAdicionais: false
    }
];

// Encomendas (sem pre├ºo, consultar via WhatsApp)
const ENCOMENDAS = [
    {
        id: 'enc-001',
        name: 'Bucho',
        icon: 'beef',
        desc: 'Preparado sob encomenda. Consulte prazos e disponibilidade pelo WhatsApp.'
    },
    {
        id: 'enc-002',
        name: 'Caldo para Sopa',
        icon: 'soup',
        desc: 'Caldo artesanal para sopas, preparado sob encomenda.'
    },
    {
        id: 'enc-003',
        name: 'Pesto',
        icon: 'leaf',
        desc: 'Pesto fresco artesanal sob encomenda em quantidades maiores.'
    }
];

// Categorias do Cat├ílogo
const DEFAULT_CATEGORIES = [
    { id: 'todos', name: 'Todos', icon: 'layout-grid' },
    { id: 'cremes', name: 'Cremes & Sopas', icon: 'soup' },
    { id: 'molhos', name: 'Molhos & Ragus', icon: 'flame' },
    { id: 'caldos', name: 'Caldos', icon: 'droplets' }
];

// Conceitos por Categoria
const CATEGORY_CONCEPTS = {
    'todos': {
        title: 'Card├ípio Completo',
        desc: 'Todos os produtos congelados dispon├¡veis para pronta entrega. Feitos com amor, tempero e personalidade.'
    },
    'cremes': {
        title: '­ƒÑú Cremes & Sopas Artesanais',
        desc: 'Cremes aveludados e reconfortantes, feitos com ingredientes frescos e selecionados.'
    },
    'molhos': {
        title: '­ƒìØ Molhos & Ragus',
        desc: 'Molhos artesanais para elevar qualquer prato. Desde o cl├íssico pomodoro at├® o ragu de carne de panela.'
    },
    'caldos': {
        title: '­ƒì▓ Caldos Nutritivos',
        desc: 'Caldos ricos e nutritivos, cozidos lentamente para m├íximo sabor e benef├¡cios.'
    }
};

// Estado da Aplica├º├úo
let cart = [];
let selectedPaymentMethod = 'pix';
let activeCategory = 'todos';
let searchQuery = '';
let currentModalProduct = null;
let currentModalQty = 1;

// Utilit├írios
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

// Persist├¬ncia do Carrinho
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

    if (titleEl) titleEl.innerHTML = searchQuery ? `Busca: "${searchQuery}"` : conceptInfo.title;
    if (descEl) descEl.textContent = searchQuery ? `Mostrando produtos que correspondem ao termo "${searchQuery}".` : conceptInfo.desc;
    if (countEl) countEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'produto' : 'produtos'}`;

    if (filtered.length === 0) {
        catalogGrid.innerHTML = `
            <div class="empty-catalog-msg">
                <i data-lucide="search-x" style="width:48px;height:48px;color:var(--text-muted);"></i>
                <p>Nenhum produto encontrado.</p>
                <button class="btn-clean-filter" onclick="window.filterCategory('todos'); window.clearSearch();">Ver todos os produtos</button>
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
    }

    catalogGrid.innerHTML = filtered.map(prod => {
        const priceFormatted = formatCurrency(prod.price);
        const badgeClass = prod.badge.includes('Premium') ? 'badge-destaque' : 'badge-congelado';

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
                            <span class="price-label">Valor:</span>
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

    document.getElementById('modal-img').src = prod.img;
    document.getElementById('modal-img').alt = prod.name;
    document.getElementById('modal-title').textContent = prod.name;
    document.getElementById('modal-desc').textContent = prod.desc;
    document.getElementById('modal-price').textContent = formatCurrency(prod.price);
    document.getElementById('modal-qty-value').textContent = '1';
    const obsInput = document.getElementById('modal-obs');
    if (obsInput) obsInput.value = '';

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
};

window.closeProductModal = function() {
    const modal = document.getElementById('product-modal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
    currentModalProduct = null;
};

window.changeModalQty = function(delta) {
    currentModalQty = Math.max(1, currentModalQty + delta);
    const valEl = document.getElementById('modal-qty-value');
    if (valEl) valEl.textContent = currentModalQty;
};

window.addToCartFromModal = function() {
    if (!currentModalProduct) return;

    const obs = (document.getElementById('modal-obs')?.value || '').trim();

    const existingIndex = cart.findIndex(item =>
        item.id === currentModalProduct.id && item.obs === obs
    );

    if (existingIndex >= 0) {
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
    window.closeProductModal();
    showToast(`${currentModalProduct.name} adicionado!`);
};

// Carrinho UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Header cart button
    const cartBtn = document.getElementById('btn-cart-nav');
    const cartCount = document.getElementById('cart-count');
    const cartTotalHeader = document.getElementById('cart-total-nav');
    const trashBtn = document.getElementById('btn-header-trash');

    if (cartBtn) {
        cartBtn.classList.toggle('cart-has-items', totalItems > 0);
    }
    if (cartCount) {
        cartCount.style.display = totalItems > 0 ? 'inline-flex' : 'none';
        cartCount.textContent = totalItems;
    }
    if (cartTotalHeader) {
        cartTotalHeader.style.display = totalItems > 0 ? 'inline' : 'none';
        cartTotalHeader.textContent = formatCurrency(subtotal);
    }
    if (trashBtn) {
        trashBtn.style.display = totalItems > 0 ? 'inline-flex' : 'none';
    }

    // Floating bar (mobile)
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
        floatingTotal.textContent = formatCurrency(subtotal);
    }

    // Cart drawer items
    renderCartItems();

    // Cart totals
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const totalEl = document.getElementById('cart-total-val');

    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
    if (totalEl) totalEl.textContent = formatCurrency(subtotal);
}

function renderCartItems() {
    const list = document.getElementById('cart-items-list');
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = `
            <div class="cart-empty-state">
                <i data-lucide="shopping-bag" style="width:40px;height:40px;"></i>
                <p>Seu pedido est├í vazio</p>
                <small>Escolha entre nossos cremes, molhos e caldos artesanais</small>
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
    }

    list.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatCurrency(item.price * item.qty)}</div>
                ${item.obs ? `<div class="cart-item-obs">"${item.obs}"</div>` : ''}
            </div>
            <div class="cart-item-qty">
                <button onclick="window.changeCartItemQty(${index}, -1)">ÔêÆ</button>
                <span>${item.qty}</span>
                <button onclick="window.changeCartItemQty(${index}, 1)">+</button>
            </div>
            <button class="btn-remove-item" onclick="window.removeCartItem(${index})" aria-label="Remover ${item.name}">
                <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
            </button>
        </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
}

window.changeCartItemQty = function(index, delta) {
    if (!cart[index]) return;
    cart[index].qty = Math.max(1, cart[index].qty + delta);
    saveCartToStorage();
    updateCartUI();
};

window.removeCartItem = function(index) {
    cart.splice(index, 1);
    saveCartToStorage();
    updateCartUI();
};

window.clearCart = function() {
    cart = [];
    saveCartToStorage();
    updateCartUI();
    showToast('Pedido limpo');
};

// Abrir/Fechar Carrinho
window.openCart = function() {
    const overlay = document.getElementById('cart-overlay');
    const drawer = document.getElementById('cart-drawer');
    if (overlay) overlay.classList.add('open');
    if (drawer) drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
};

window.closeCart = function() {
    const overlay = document.getElementById('cart-overlay');
    const drawer = document.getElementById('cart-drawer');
    if (overlay) overlay.classList.remove('open');
    if (drawer) drawer.classList.remove('open');
    document.body.style.overflow = '';
};

// Pagamento
window.setPaymentMethod = function(method) {
    selectedPaymentMethod = method;
    document.querySelectorAll('.pay-method-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.method === method);
    });
    const trocoBox = document.getElementById('troco-input-box');
    if (trocoBox) trocoBox.style.display = method === 'dinheiro' ? 'block' : 'none';
};

// Enviar Pedido no WhatsApp
window.submitOrderToWhatsApp = function() {
    if (cart.length === 0) {
        showToast('Adicione produtos ao pedido');
        return;
    }

    const clientName = (document.getElementById('client-name')?.value || '').trim();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const paymentLabels = { pix: 'PIX', cartao: 'Cart├úo', dinheiro: 'Dinheiro' };
    const paymentLabel = paymentLabels[selectedPaymentMethod] || 'PIX';

    let trocoText = '';
    if (selectedPaymentMethod === 'dinheiro') {
        const trocoVal = (document.getElementById('troco-val')?.value || '').trim();
        if (trocoVal) trocoText = `\n­ƒÆÁ Troco para: ${trocoVal}`;
    }

    let msg = `­ƒâÅ *PEDIDO ÔÇö CURINGA COZINHA PERSONALIZADA*\n`;
    msg += `ÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöü\n\n`;

    cart.forEach((item, i) => {
        msg += `${i + 1}. *${item.name}* x${item.qty} ÔÇö ${formatCurrency(item.price * item.qty)}\n`;
        if (item.obs) msg += `   ­ƒôØ _${item.obs}_\n`;
    });

    msg += `\nÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöüÔöü\n`;
    msg += `­ƒÆ░ *Total: ${formatCurrency(subtotal)}*\n`;
    msg += `­ƒÆ│ Pagamento: ${paymentLabel}${trocoText}\n`;

    if (clientName) {
        msg += `­ƒæñ Cliente: ${clientName}\n`;
    }

    msg += `\n_Pedido feito pelo card├ípio digital Curinga_`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, '_blank');

    cart = [];
    saveCartToStorage();
    updateCartUI();
    window.closeCart();
    showToast('Pedido enviado! Ô£à');
};

// Encomenda via WhatsApp
window.openEncomendaWhatsApp = function(productName) {
    const msg = encodeURIComponent(
        `Ol├í! Gostaria de fazer uma *encomenda* de *${productName}*. Poderia me informar sobre prazos e disponibilidade? ­ƒâÅ`
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${msg}`, '_blank');
};

// Inicializa├º├úo
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    renderCategories();
    renderProducts();
    updateCartUI();

    // Close modal on overlay click
    const modalOverlay = document.getElementById('product-modal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) window.closeProductModal();
        });
    }

    // Close cart on overlay click
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => window.closeCart());
    }

    // Lucide icons
    if (window.lucide) window.lucide.createIcons();
});
