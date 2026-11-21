import { useState } from 'react';
import type { MouseEvent } from 'react';
import styles from './PreVenta.module.scss';
import { WHATSAPP_NUMBER, PREVENTA_EVENT_NAME, EXCHANGE_RATE } from '../../config';

type Hamburger = {
  id: string;
  name: string;
  price: string;
  ingredients: string[];
  image: string;
};

const HAMBURGERS: Hamburger[] = [
  {
    id: 'dahaus',
    image: '/preventa-dahaus.webp',
    name: 'DAHAUS',
    price: '$8.99',
    ingredients: [
      'Pan de papa',
      'Carne (100 g)',
      'Queso tipo americano',
      'Tocineta crocante',
      'relish',
      'Cebolla morada en brunoise',
      'Salsa Dahaus'
    ]
  },
  {
    id: 'smash',
    image: '/preventa-smash.webp',
    name: 'SMASH',
    price: '$8.99',
    ingredients: [
      'Pan de papa',
      'Carne (100 g)',
      'Queso tipo americano',
      'Tocineta crocante',
      'Cebolla caramelizada',
      'Salsa Smash'
    ]
  },
  {
    id: 'hot',
    image: '/preventa-hot.webp',
    name: 'HOT',
    price: '$8.99',
    ingredients: [
      'Pan de papa',
      'Carne (100 g)',
      'Queso tipo americano',
      'Tocineta crocante',
      'Pepinillos encurtidos',
      'Cebolla morada en brunoise',
      'Salsa hot picante'
    ]
  },
  {
    id: 'beef-classic',
    image: '/preventa-clasica-carne.webp',
    name: 'CLÁSICA DE CARNE',
    price: '$8.99',
    ingredients: [
      'Pan de papa',
      'Carne (100 g)',
      'Queso tipo americano',
      'Tocineta crocante',
      'Cebolla',
      'Lechuga',
      'Tomate',
      'Salsa tártara'
    ]
  },
  {
    id: 'chicken-classic',
    image: '/preventa-clasica-pollo.webp',
    name: 'CLÁSICA DE POLLO',
    price: '$8.99',
    ingredients: [
      'Pan de papa',
      'Pechuga de pollo (100 g)',
      'Queso tipo americano',
      'Tocineta crocante',
      'Cebolla',
      'Lechuga',
      'Tomate',
      'Salsa tártara'
    ]
  }
];

const BEVERAGES: Hamburger[] = [
  { id: 'pepsi-original', name: 'PEPSI ORIGINAL', price: '$2.50', ingredients: ['Lata 355 ml'], image: '/preventa-pepsi-original.webp' },
  { id: 'pepsi-zero', name: 'PEPSI ZERO', price: '$2.50', ingredients: ['Lata 355 ml'], image: '/preventa-pepsi-zero.webp' },
  { id: 'pepsi-light', name: 'PEPSI LIGHT', price: '$2.50', ingredients: ['Lata 355 ml'], image: '/preventa-pepsi-light.webp' },
  { id: 'gatorade', name: 'GATORADE', price: '$2.80', ingredients: ['500 ml', 'Sabor según disponibilidad'], image: '/preventa-gatorade.webp' },
  { id: 'lipton', name: 'TÉ LIPTON', price: '$2.80', ingredients: ['500 ml', 'Sabor según disponibilidad'], image: '/preventa-lipton.webp' },
  { id: 'minalba', name: 'AGUA MINALBA', price: '$1.50', ingredients: ['Botella plástica 600 ml'], image: '/preventa-minalba.webp' }
];

const ALL_PRODUCTS: Hamburger[] = [...HAMBURGERS, ...BEVERAGES];

type OrderItem = {
  hamburger: Hamburger;
  quantity: number;
  subtotal: number;
};

type CustomerData = {
  name: string;
  document: string;
};

const formatBs = (usd: number): string => {
  const bsCents = Math.round(Math.round(usd * 100) * EXCHANGE_RATE);
  const entero = Math.floor(bsCents / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const dec = String(bsCents % 100).padStart(2, '0');
  return 'Bs. ' + entero + ',' + dec;
};

const bsParen = (usd: number): string => (EXCHANGE_RATE ? ' (' + formatBs(usd) + ')' : '');

const PAYMENT_DETAILS = {
  bank: 'Banco Venezolano de Crédito',
  holder: 'DAHAUS C.A.',
  rif: 'J-50171990-0',
  account: '0104-0144-5901-4406-5115',
  phone: '0412-2922078'
};



const generateReference = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let ref = 'DH';
  for (let i = 0; i < 8; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
};

export default function PreVenta() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData>({ name: '', document: '' });
  const [reference, setReference] = useState<string>(() => generateReference());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const updateQuantity = (hamburgerId: string, newQuantity: number) => {
    if (newQuantity < 0) return;

    setOrderItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.hamburger.id === hamburgerId);
      const price = parseFloat(ALL_PRODUCTS.find(h => h.id === hamburgerId)!.price.replace('$', ''));

      if (newQuantity === 0) {
        // Remove item if quantity is 0
        return prev.filter(item => item.hamburger.id !== hamburgerId);
      } else if (existingItemIndex >= 0) {
        // Update existing item
        const updated = [...prev];
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: newQuantity,
          subtotal: price * newQuantity
        };
        return updated;
      } else {
        // Add new item
        const hamburger = ALL_PRODUCTS.find(h => h.id === hamburgerId)!;
        return [...prev, {
          hamburger,
          quantity: newQuantity,
          subtotal: parseFloat(hamburger.price.replace('$', '')) * newQuantity
        }];
      }
    });
  };

  const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    const documentRegex = /^[0-9]{6,10}$/;
    return customerData.name.trim() !== '' &&
           documentRegex.test(customerData.document.trim()) &&
           orderItems.length > 0;
  };

 const handleSubmit = () => {
  if (!isFormValid()) return;

  setShowPaymentDetails(false);
  setCopiedField(null);
  setShowConfirmation(true);
};

  const generateWhatsAppMessage = () => {
    const eventName = PREVENTA_EVENT_NAME;
    const itemsText = orderItems
     .map(item => `${item.quantity}x ${item.hamburger.name} - $${item.subtotal.toFixed(2)}`)
      .join('\n');

    return `PREVENTA DAHAUS - ${eventName}\n\n` +
           `Código del pedido: ${reference}\n\n` +
           `Cliente: ${customerData.name}\n` +
           `Cédula/Pasaporte: ${customerData.document.trim()}\n\n` +
           `PEDIDO:\n${itemsText}\n\n` +
           `TOTAL: $${total.toFixed(2)}${bsParen(total)}\n\n` +
           `Pedido hecho online en www.DAHAUSmerida.com\n\n`+
           `ADJUNTO MI COMPROBANTE DE PAGO:`;
  };

  const whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER.replace(/\D/g, '') + '?text=' + encodeURIComponent(generateWhatsAppMessage());

  const resetOrder = () => {
    setShowConfirmation(false);
    setOrderItems([]);
    setCustomerData({ name: '', document: '' });
    setOpenId(null);
    setReference(generateReference());
    setShowPaymentDetails(false);
setCopiedField(null);
  };

  const handleConfirmSend = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    resetOrder();
  };

  if (!PREVENTA_EVENT_NAME) return null;
const copyToClipboard = async (value: string, field: string) => {
  try {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);

    window.setTimeout(() => {
      setCopiedField(current => current === field ? null : current);
    }, 2000);
  } catch {
    setCopiedField(`error-${field}`);

    window.setTimeout(() => {
      setCopiedField(current => current === `error-${field}` ? null : current);
    }, 2000);
  }
};
  return (
    <section id="preventa" className={styles.section} aria-labelledby="preventa-title">
      <div className={styles.container}>
        <h2 id="preventa-title" className={styles.title}>
          Preventa - {PREVENTA_EVENT_NAME}
        </h2>

        <div className={styles.content}>
          {/* Hamburger Selection */}
          <div className={styles.hamburgers}>
            <h3 className={styles.subtitle}>Selecciona tu hamburguesa</h3>
            <p className={styles.hint}>Toca una hamburguesa para ver su foto e ingredientes.</p>
            <div className={styles.hamburgerGrid}>
              {HAMBURGERS.map(hamburger => {
                const orderItem = orderItems.find(item => item.hamburger.id === hamburger.id);
                const quantity = orderItem?.quantity || 0;

                return (
                  <details
                    key={hamburger.id}
                    className={styles.accordion}
                    open={openId === hamburger.id}
                  >
                    <summary
                      className={styles.accordionSummary}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenId(prev => (prev === hamburger.id ? null : hamburger.id));
                      }}
                    >
                      <span className={styles.accordionTitle}>
                        <span className={styles.accordionName}>{hamburger.name}</span>
                        <span className={styles.accordionPrice}>{hamburger.price}</span>
                        <span className={styles.accordionHint}>{openId === hamburger.id ? 'Ocultar detalle' : 'Ver detalle'}</span>
                      </span>
                      <span className={styles.accordionCounter} onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className={styles.quantityButton}
                          onClick={() => updateQuantity(hamburger.id, quantity - 1)}
                          disabled={quantity <= 0}
                          aria-label={'Quitar una ' + hamburger.name}
                        >
                          -
                        </button>
                        <span className={styles.quantityDisplay}>{quantity}</span>
                        <button
                          type="button"
                          className={styles.quantityButton}
                          onClick={() => updateQuantity(hamburger.id, quantity + 1)}
                          aria-label={'Agregar una ' + hamburger.name}
                        >
                          +
                        </button>
                      </span>
                    </summary>
                    <div className={styles.accordionBody}>
                      <img
                        src={hamburger.image}
                        alt={'Hamburguesa ' + hamburger.name}
                        className={`${styles.accordionPhoto} ${styles.hamburgerPhoto}`}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <ul className={styles.ingredientsList}>
                        {hamburger.ingredients.map((ingredient, index) => (
                          <li key={index} className={styles.ingredient}>
                            • {ingredient}
                          </li>
                        ))}
                      </ul>
                      {quantity > 0 && (
                        <div className={styles.itemSubtotal}>
                          Subtotal: ${(parseFloat(hamburger.price.replace('$', '')) * quantity).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </details>
                );
              })}
            </div>

            <h3 className={styles.subtitle}>Bebidas</h3>
            <div className={styles.hamburgerGrid}>
              {BEVERAGES.map(hamburger => {
                const orderItem = orderItems.find(item => item.hamburger.id === hamburger.id);
                const quantity = orderItem?.quantity || 0;

                return (
                  <details
                    key={hamburger.id}
                    className={styles.accordion}
                    open={openId === hamburger.id}
                  >
                    <summary
                      className={styles.accordionSummary}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenId(prev => (prev === hamburger.id ? null : hamburger.id));
                      }}
                    >
                      <span className={styles.accordionTitle}>
                        <span className={styles.accordionName}>{hamburger.name}</span>
                        <span className={styles.accordionPrice}>{hamburger.price}</span>
                        <span className={styles.accordionHint}>{openId === hamburger.id ? 'Ocultar detalle' : 'Ver detalle'}</span>
                      </span>
                      <span className={styles.accordionCounter} onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className={styles.quantityButton}
                          onClick={() => updateQuantity(hamburger.id, quantity - 1)}
                          disabled={quantity <= 0}
                          aria-label={'Quitar una ' + hamburger.name}
                        >
                          -
                        </button>
                        <span className={styles.quantityDisplay}>{quantity}</span>
                        <button
                          type="button"
                          className={styles.quantityButton}
                          onClick={() => updateQuantity(hamburger.id, quantity + 1)}
                          aria-label={'Agregar una ' + hamburger.name}
                        >
                          +
                        </button>
                      </span>
                    </summary>
                    <div className={styles.accordionBody}>
                      <img
                        src={hamburger.image}
                        alt={'Bebida ' + hamburger.name}
                        className={`${styles.accordionPhoto} ${styles.beveragePhoto}`}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <ul className={styles.ingredientsList}>
                        {hamburger.ingredients.map((ingredient, index) => (
                          <li key={index} className={styles.ingredient}>
                            • {ingredient}
                          </li>
                        ))}
                      </ul>
                      {quantity > 0 && (
                        <div className={styles.itemSubtotal}>
                          Subtotal: ${(parseFloat(hamburger.price.replace('$', '')) * quantity).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </details>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className={styles.orderSummary}>
            <h3 className={styles.subtitle}>Resumen del pedido</h3>
            {orderItems.length > 0 ? (
              <div className={styles.summaryContent}>
                <div className={styles.itemsList}>
                  {orderItems.map(item => (
                    <div key={item.hamburger.id} className={styles.summaryItem}>
                      <span className={styles.itemName}>{item.hamburger.name}</span>
                      <span className={styles.itemQuantity}>{item.quantity}x</span>
                      <span className={styles.itemPrice}>${item.subtotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.totalSection}>
                  <span className={styles.totalLabel}>Total:</span>
                  <span className={styles.totalAmount}>${total.toFixed(2)}{bsParen(total)}</span>
                </div>

                {reference && (
                  <div className={styles.reference}>
                    Referencia: {reference}
                  </div>
                )}

                <div className={styles.customerForm}>
                  <h4 className={styles.formTitle}>Datos del cliente</h4>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="customer-name">
                      Nombre completo
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      className={styles.formInput}
                      value={customerData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="customer-document">
                      Cédula o pasaporte
                    </label>
                    <input
                      id="customer-document"
                      type="text" inputMode="numeric"
                      className={styles.formInput}
                      value={customerData.document}
                      onChange={(e) => handleInputChange('document', e.target.value)}
                      placeholder="Cédula o pasaporte (solo números)"
                    />
                  </div>

                  {!isFormValid() && (
                    <div className={styles.errorMessage}>
                      Debe completar todos los campos requeridos.
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className={styles.submitButton}
                  onClick={handleSubmit}
                  disabled={!isFormValid()}
                >
                  Confirmar pedido
                </button>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyMessage}>No hay artículos seleccionados</p>
              </div>
            )}
          </div>

          {/* Confirmation Modal */}
          {showConfirmation && (
            <div className={styles.confirmationModal}>
              <div className={styles.modalContent}>
                <h3 className={styles.modalTitle}>Confirmación de pedido</h3>

                <div className={styles.confirmationDetails}>
                  <p><strong>Nombre:</strong> {customerData.name}</p>
                  <p><strong>Cédula/Pasaporte:</strong> {customerData.document}</p>
                  <p><strong>Referencia:</strong> {reference}</p>

                  <h4>Artículos seleccionados:</h4>
                  {orderItems.map(item => (
                    <p key={item.hamburger.id}>
                      {item.hamburger.name} - {item.quantity}x - ${item.subtotal.toFixed(2)}
                    </p>
                  ))}

                  <p className={styles.modalTotal}><strong>Total:</strong> ${total.toFixed(2)}{bsParen(total)}</p>
                  {/* Información de pago */}
<div className={styles.paymentSection}>

  <button
    type="button"
    className={styles.paymentToggle}
    onClick={() => setShowPaymentDetails(prev => !prev)}
    aria-expanded={showPaymentDetails}
  >
    <span>
      {showPaymentDetails ? 'Ocultar información de pago' : 'Ver información de pago'}
    </span>

    <span
      className={`${styles.paymentArrow} ${showPaymentDetails ? styles.paymentArrowOpen : ''}`}
      aria-hidden="true"
    />
  </button>

  {showPaymentDetails && (
    <div className={styles.paymentDetails}>

      <h4 className={styles.paymentDetailsTitle}>
        Datos para realizar el pago
      </h4>

      <div className={styles.paymentBankInfo}>
        <span>{PAYMENT_DETAILS.bank}</span>
        <strong>{PAYMENT_DETAILS.holder}</strong>
      </div>

      {[
        { id: 'rif', label: 'RIF', value: PAYMENT_DETAILS.rif },
        { id: 'account', label: 'Cuenta bancaria', value: PAYMENT_DETAILS.account },
        { id: 'phone', label: 'Teléfono (pago móvil)', value: PAYMENT_DETAILS.phone }
      ].map(field => (
        <div className={styles.paymentDataItem} key={field.id}>
          <div className={styles.paymentDataInfo}>
            <span className={styles.paymentDataLabel}>
              {field.label}
            </span>

            <strong className={styles.paymentDataValue}>
              {field.value}
            </strong>
          </div>

          <button
            type="button"
            className={styles.copyButton}
            onClick={() => copyToClipboard(field.value, field.id)}
            aria-label={`Copiar ${field.label}`}
          >
            {copiedField === field.id ? (
              '✓ Copiado'
            ) : copiedField === `error-${field.id}` ? (
              'Error'
            ) : (
              <>
                <span aria-hidden="true">▢</span>
                Copiar
              </>
            )}
          </button>
        </div>
      ))}

      <p className={styles.paymentInstructions}>
        Realiza el pago y adjunta el comprobante al enviar tu pedido por WhatsApp.
      </p>

    </div>
  )}

</div>
                </div>

                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={styles.modalCancelButton}
                    onClick={() => setShowConfirmation(false)}
                  >
                    Cancelar
                  </button>
                  <a
                    href={whatsappUrl}
                    onClick={handleConfirmSend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalConfirmButton}
                  >
                    Confirmar y enviar por WhatsApp
                  </a>
                </div>

               <div className={styles.paymentNote}>
  <p>
    ✅ Recuerda adjuntar tu comprobante de pago en WhatsApp
    para completar tu pedido.
  </p>
</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}