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
                            <span class="price-label">Valor:</span>
                            <span class="price-value">${priceFormatted}</span>
                        </div>
                        <div class="card-action-wrap" id="card-action-${prod.id}">
                            ${getCardActionHtml(prod.id)}
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


// Retorna o HTML do botão ou seletor (+ / -) dentro do card
function getCardActionHtml(prodId) {
    const cartItem = cart.find(item => item.id === prodId);
    const prod = PRODUCTS.find(p => p.id === prodId);
    if (!prod) return '';

    if (cartItem && cartItem.qty > 0) {
        return `
            <div class="card-qty-control" onclick="event.stopPropagation()">
                <button type="button" class="btn-card-qty-btn" onclick="event.stopPropagation(); window.changeCardQty('${prodId}', -1)" aria-label="Diminuir quantidade">−</button>
                <span class="card-qty-count">${cartItem.qty}</span>
                <button type="button" class="btn-card-qty-btn" onclick="event.stopPropagation(); window.changeCardQty('${prodId}', 1)" aria-label="Aumentar quantidade">+</button>
            </div>
        `;
    }

    return `
        <button type="button" class="btn-add-item" onclick="event.stopPropagation(); window.quickAddToCart('${prodId}')" aria-label="Adicionar ${prod.name}">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Pedir</span>
        </button>
    `;
}

// Adição rápida com 1 toque diretamente no card
window.quickAddToCart = function(prodId) {
    const prod = PRODUCTS.find(p => p.id === prodId);
    if (!prod) return;

    const existingIndex = cart.findIndex(item => item.id === prodId);
    if (existingIndex !== -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({
            id: prod.id,
            name: prod.name,
            price: prod.price,
            img: prod.img,
            qty: 1,
            obs: ''
        });
    }

    saveCartToStorage();
    updateCartUI();
    showToast(`+1 ${prod.name} adicionado ao pedido!`);
};

// Alteração direta de quantidade (+ e -) no card
window.changeCardQty = function(prodId, delta) {
    const index = cart.findIndex(item => item.id === prodId);
    if (index === -1) {
        if (delta > 0) window.quickAddToCart(prodId);
        return;
    }

    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
        showToast("Item removido do pedido.");
    }

    saveCartToStorage();
    updateCartUI();
};

function updateCartUI() {
    // Atualizar classe has-cart-bar no body para posicionamento inteligente dos widgets flutuantes
    const totalItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);
    document.body.classList.toggle('has-cart-bar', totalItemsCount > 0);

    // Atualizar botões de ação nos cards que estão visíveis
    PRODUCTS.forEach(p => {
        const wrap = document.getElementById(`card-action-${p.id}`);
        if (wrap) {
            wrap.innerHTML = getCardActionHtml(p.id);
        }
    });
    if (window.lucide) window.lucide.createIcons();

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

    const headerTrash = document.getElementById('btn-header-trash');
    if (headerTrash) {
        headerTrash.style.display = totalItems > 0 ? 'inline-flex' : 'none';
    }

    const drawerTrash = document.getElementById('btn-drawer-trash');
    if (drawerTrash) {
        drawerTrash.style.display = totalItems > 0 ? 'inline-flex' : 'none';
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
                <i data-lucide="shopping-bag" style="width:44px;height:44px;color:#78716C;"></i>
                <p>Seu pedido está vazio.</p>
                <p style="font-size:0.8rem;margin-top:4px;color:#A8A29E;">Escolha cremes, molhos e caldos para começar.</p>
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
                    <div class="cart-item-price">${itemTotal}</div>
                    ${item.obs ? `<div class="cart-item-obs">Obs: ${item.obs}</div>` : ''}
                </div>
                <div class="cart-item-actions">
                    <button type="button" class="btn-cart-qty" onclick="window.changeCartItemQty(${index}, -1)" aria-label="Diminuir">−</button>
                    <span class="cart-item-qty-num">${item.qty}</span>
                    <button type="button" class="btn-cart-qty" onclick="window.changeCartItemQty(${index}, 1)" aria-label="Aumentar">+</button>
                </div>
                <button type="button" class="btn-remove-item" onclick="window.removeCartItem(${index})" title="Remover item" aria-label="Remover ${item.name}">
                    <i data-lucide="trash-2" style="width:15px;height:15px;"></i>
                </button>
            </div>
        `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
}

// Enviar Pedido via WhatsApp (Formato Padrão de Comanda Onira.fly)
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
    const subtotalFormatted = 'R$ ' + subtotal.toFixed(2).replace('.', ',');

    let text = `pedido via site by Onira.fly

`;
    text += `Solicitação de Retirada no balcão

`;

    cart.forEach(item => {
        let itemHeader = `${item.qty}x ${item.name}`;
        if (item.portion) itemHeader += ` · ${item.portion}`;
        text += `${itemHeader}
`;

        if (item.addons && Array.isArray(item.addons) && item.addons.length > 0) {
            item.addons.forEach(a => {
                text += `+ ${a.name || a}
`;
            });
        }

        if (item.obs) {
            text += `+ ${item.obs}
`;
        }

        const itemTotal = (item.price * item.qty).toFixed(2).replace('.', ',');
        text += `R$ ${itemTotal}

`;
    });

    text += `Itens: ${subtotalFormatted}
`;
    text += `Total: ${subtotalFormatted}

`;

    if (clientName) {
        text += `${clientName}

`;
    }

    if (selectedPaymentMethod === 'pix') {
        text += `Pagamento em Pix — combinamos a chave por aqui

`;
    } else if (selectedPaymentMethod === 'cartao') {
        text += `Pagamento no Cartão — favor trazer a maquininha

`;
    } else if (selectedPaymentMethod === 'dinheiro') {
        const change = trocoVal ? `troco para ${trocoVal}` : 'sem necessidade de troco';
        text += `Pagamento em Dinheiro — ${change}

`;
    } else {
        text += `Pagamento em Pix — combinamos a chave por aqui

`;
    }

    text += `Enviado pelo site do Curinga`;

    const encoded = encodeURIComponent(text);
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
