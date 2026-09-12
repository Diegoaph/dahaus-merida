#!/usr/bin/env python3
"""Genera public/menu.pdf (Menú Dahaus) y public/menu-simplex.pdf (Menú Simplex).

Fuentes de verdad:
  - menu-assets/dahaus.json   (menú completo, todas las sedes)
  - menu-assets/simplex.json  (menú simplex, lunes a viernes hasta 7:00 PM)
Fuentes vendorizadas en menu-assets/fonts/ (Bangers + Lato, licencia OFL).

Uso:  python3 scripts/generate-menu.py
"""

import json
import os

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(BASE, 'menu-assets')
FONTS = os.path.join(ASSETS, 'fonts')
PUBLIC = os.path.join(BASE, 'public')

# Paleta de marca
CARBON = '#1C1A17'
SAND = '#F0E9DB'
CEMENT = '#DBD6CB'
WOOD = '#6B4F33'
AMBER = '#FFC107'
MUTED = '#4A4439'

WHATSAPP = '+58 414-700-9402'
INSTAGRAM = '@dahausmerida'

# Categorías: clave -> nombre de sección
CATEGORY_NAMES = {
    'hamburguesas_crispy': 'Hamburguesas Crispy',
    'hamburguesas_gourmet': 'Hamburguesas Gourmet',
    'hamburguesas_clasicas': 'Hamburguesas Clásicas',
    'hamburguesas_doppelt': 'Hamburguesas Doppelt',
    'hamburguesas_especiales': 'Hamburguesas Especiales',
    'cajita_feliz': 'Cajita Feliz',
    'ensaladas': 'Ensaladas',
    'alitas_de_pollo': 'Alitas de Pollo',
    'entradas': 'Entradas',
    'platos': 'Platos',
    'parrillas': 'Parrillas',
    'cortes_de_res': 'Cortes de Res',
    'sodas_saborizadas': 'Sodas Saborizadas',
    'batidos_y_merengadas': 'Batidos y Merengadas',
    'frappes': 'Frappés',
    'bebidas_energeticas': 'Bebidas Energéticas',
    'varios': 'Varios',
    'cocteles': 'Cócteles',
    'vinos': 'Vinos',
    'cervezas_nacionales': 'Cervezas Nacionales',
    'cervezas_importadas': 'Cervezas Importadas',
}


def register_fonts():
    pdfmetrics.registerFont(TTFont('Bangers', os.path.join(FONTS, 'Bangers-Regular.ttf')))
    pdfmetrics.registerFont(TTFont('Lato', os.path.join(FONTS, 'Lato-Regular.ttf')))
    pdfmetrics.registerFont(TTFont('Lato-Bold', os.path.join(FONTS, 'Lato-Bold.ttf')))


from reportlab.lib.styles import ParagraphStyle  # noqa: E402

ST_NAME = ParagraphStyle(
    'name',
    fontName='Lato-Bold',
    fontSize=11,
    leading=15,
    textColor=HexColor(CARBON),
)
ST_DESC = ParagraphStyle(
    'desc',
    fontName='Lato',
    fontSize=9,
    leading=12.5,
    textColor=HexColor(WOOD),
    spaceBefore=2,
)
ST_PRICE = ParagraphStyle(
    'price',
    fontName='Lato-Bold',
    fontSize=11,
    leading=15,
    textColor=HexColor(AMBER),
    alignment=TA_RIGHT,
)
ST_PRICE_DETAIL = ParagraphStyle(
    'price_detail',
    fontName='Lato-Bold',
    fontSize=8,
    leading=11,
    textColor=HexColor(AMBER),
    alignment=TA_RIGHT,
)
ST_CAT = ParagraphStyle(
    'cat',
    fontName='Bangers',
    fontSize=19,
    leading=22,
    textColor=HexColor(CARBON),
)
ST_INTRO = ParagraphStyle(
    'intro',
    fontName='Lato-Bold',
    fontSize=10,
    leading=14,
    textColor=HexColor(WOOD),
)


def item_paragraph(item):
    desc = item.get('descripcion') or item.get('ingredientes')
    if isinstance(desc, list):
        desc = ', '.join(desc)
    left = f'<font name="Lato-Bold" size="11" color="{CARBON}">{item["nombre"]}</font>'
    if desc:
        left += f'<br/><font name="Lato" size="9" color="{WOOD}">{desc}</font>'
    return Paragraph(left, ST_NAME)


def price_para(item):
    if 'precio' in item:
        return Paragraph(f'<font name="Lato-Bold" size="11" color="{AMBER}">{item["precio"]}</font>', ST_PRICE)
    parts = []
    if 'precio_batido' in item:
        parts.append('Batido ' + item['precio_batido'])
    if 'precio_merengada' in item:
        parts.append('Merengada ' + item['precio_merengada'])
    if 'precio_copa' in item:
        parts.append('Copa ' + item['precio_copa'])
    if 'precio_botella' in item:
        parts.append('Botella ' + item['precio_botella'])
    if 'precio_lata' in item:
        parts.append('Lata ' + item['precio_lata'])
    if parts:
        return Paragraph(
            '<br/>'.join(f'<font name="Lato-Bold" size="8" color="{AMBER}">{p}</font>' for p in parts),
            ST_PRICE_DETAIL,
        )
    return ''


def items_table(items, compact=False):
    rows = []
    for item in items:
        left = item_paragraph(item)
        price = price_para(item)
        if compact:
            rows.append([left, price] if price else [left, ''])
        else:
            rows.append([left, price] if price else [left, ''])
    col_widths = [595.27 - 54 - 54 - 95, 95]
    table = Table(rows, colWidths=col_widths, hAlign='LEFT')
    style = [
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 6 if not compact else 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6 if not compact else 4),
    ]
    if not compact:
        style.append(('LINEBELOW', (0, 0), (-1, -2), 0.5, HexColor(CEMENT)))
    table.setStyle(TableStyle(style))
    return table


def category_block(name, items, compact=False):
    flow = [
        Spacer(1, 4),
        Paragraph(f'<font name="Bangers" size="19" color="{CARBON}">{name}</font>', ST_CAT),
        HRFlowable(width='100%', thickness=3, color=HexColor(AMBER), spaceBefore=3, spaceAfter=10),
    ]
    t = items_table(items, compact=compact)
    if len(items) <= 6:
        flow.append(t)
    else:
        flow.extend([t, Spacer(1, 8)])
    flow.append(Spacer(1, 12))
    return flow


def build_dahaus():
    data = json.load(open(os.path.join(ASSETS, 'dahaus.json'), encoding='utf-8'))
    out = os.path.join(PUBLIC, 'menu.pdf')
    doc = SimpleDocTemplate(
        out,
        pagesize=A4,
        title='Menú Dahaus Mérida',
        author='Dahaus Mérida',
        subject='Menú de hamburguesas, parrillas y bebidas. Precios en USD.',
        leftMargin=54,
        rightMargin=54,
        topMargin=76,
        bottomMargin=80,
    )

    def cover(c, d):
        w, h = A4
        c.setFillColor(HexColor(CARBON))
        c.rect(0, 0, w, h, stroke=0, fill=1)
        c.setFillColor(HexColor(SAND))
        c.setFont('Bangers', 26)
        c.drawCentredString(w / 2, 712, 'DAHAUS MÉRIDA')
        c.setFillColor(HexColor(AMBER))
        c.rect(w / 2 - 70, 690, 140, 3, stroke=0, fill=1)
        c.setFillColor(HexColor(SAND))
        c.setFont('Bangers', 118)
        c.drawCentredString(w / 2, 520, 'DAHAUS')
        c.setFillColor(HexColor(AMBER))
        c.setFont('Bangers', 52)
        c.drawCentredString(w / 2, 452, 'MÉRIDA')
        c.setFillColor(HexColor(SAND))
        c.setFont('Lato', 11)
        c.drawCentredString(w / 2, 338, 'Hamburguesas premium junto a las canchas de padel')
        c.setFillColor(HexColor('#B4A98E'))
        c.setFont('Lato', 9)
        c.drawCentredString(w / 2, 318, 'Delivery a toda Mérida y Ejido · Pedidos por WhatsApp')
        c.setFillColor(HexColor(AMBER))
        c.rect(0, 0, w, 124, stroke=0, fill=1)
        c.setFillColor(HexColor(CARBON))
        c.setFont('Bangers', 22)
        c.drawCentredString(w / 2, 82, 'PEDIDOS POR WHATSAPP')
        c.setFont('Bangers', 44)
        c.drawCentredString(w / 2, 44, '+58 414-700-9402')
        c.setFont('Lato-Bold', 8)
        c.drawCentredString(w / 2, 22, 'Garana Padel Club · Metro Atletik · ' + INSTAGRAM)

    def header(c, d):
        w, h = A4
        c.setFillColor(HexColor(CARBON))
        c.setFont('Bangers', 16)
        c.drawString(54, h - 48, 'DAHAUS MÉRIDA')
        c.setFillColor(HexColor(MUTED))
        c.setFont('Lato-Bold', 9)
        c.drawRightString(w - 54, h - 46, 'Menú · Precios en USD')
        c.setStrokeColor(HexColor(AMBER))
        c.setLineWidth(3)
        c.line(54, h - 56, w - 54, h - 56)

    def footer(c, d):
        w, h = A4
        c.setStrokeColor(HexColor(CEMENT))
        c.setLineWidth(0.75)
        c.line(54, 52, w - 54, 52)
        c.setFillColor(HexColor(MUTED))
        c.setFont('Lato', 8.5)
        c.drawString(54, 36, 'Menú Dahaus Mérida · Precios en USD · Los mismos en todas las sedes')
        c.setFont('Lato-Bold', 8.5)
        c.drawRightString(w - 54, 36, 'WhatsApp ' + WHATSAPP)
        c.setFont('Lato', 8)
        c.drawCentredString(w / 2, 36, str(c.getPageNumber()))

    doc.build(
        [
            PageBreak(),
            Paragraph(
                '<font name="Lato-Bold" size="10" color="' + WOOD + '">Hamburguesas artesanales, '
                'parrillas y bebidas. Todo con pan de papa, horneado a diario.</font>',
                ST_INTRO,
            ),
            Spacer(1, 12),
        ]
        + list(dahaus_sections(data))
        + [
            Spacer(1, 6),
            Paragraph(
                '<font name="Lato" size="8.5" color="' + MUTED + '">Precios en USD, sujetos a '
                'cambio. Los contornos se escogen al momento de pedir. Todos los cortes se '
                'sirven a la parrilla.</font>',
                ParagraphStyle(
                    'micro',
                    fontName='Lato',
                    fontSize=8.5,
                    leading=11,
                    textColor=HexColor(MUTED),
                ),
            ),
        ],
        onFirstPage=cover,
        onLaterPages=header,
    )
    return out


def dahaus_sections(data):
    for key, value in data.items():
        if key == 'bebidas_y_otros':
            for sub, items in value.items():
                yield from category_block(CATEGORY_NAMES[sub], items, compact=True)
        else:
            yield from category_block(CATEGORY_NAMES[key], value)


def build_simplex():
    data = json.load(open(os.path.join(ASSETS, 'simplex.json'), encoding='utf-8'))
    out = os.path.join(PUBLIC, 'menu-simplex.pdf')
    doc = SimpleDocTemplate(
        out,
        pagesize=A4,
        title='Menú Simplex · Lunes a Viernes hasta 7:00 PM',
        author='Dahaus Mérida',
        subject='Menú Simplex de hamburguesas, con papas rayadas incluidas. Solo lunes a viernes hasta las 7:00 PM.',
        leftMargin=54,
        rightMargin=54,
        topMargin=76,
        bottomMargin=80,
    )

    def cover(c, d):
        w, h = A4
        c.setFillColor(HexColor(CARBON))
        c.rect(0, 0, w, h, stroke=0, fill=1)
        c.setFillColor(HexColor(SAND))
        c.setFont('Bangers', 22)
        c.drawCentredString(w / 2, 712, 'DAHAUS MÉRIDA · MENÚ SIMPLEX')
        c.setFillColor(HexColor(AMBER))
        c.rect(w / 2 - 70, 690, 140, 3, stroke=0, fill=1)
        c.setFillColor(HexColor(SAND))
        c.setFont('Bangers', 100)
        c.drawCentredString(w / 2, 540, 'MENÚ')
        c.setFillColor(HexColor(AMBER))
        c.setFont('Bangers', 66)
        c.drawCentredString(w / 2, 470, 'SIMPLEX')
        c.setFillColor(HexColor(AMBER))
        c.rect(0, 306, w, 62, stroke=0, fill=1)
        c.setFillColor(HexColor(CARBON))
        c.setFont('Bangers', 22)
        c.drawCentredString(w / 2, 338, 'LUNES A VIERNES · HASTA LAS 7:00 PM')
        c.setFillColor(HexColor(SAND))
        c.setFont('Lato', 11)
        c.drawCentredString(w / 2, 270, 'Todas las hamburguesas incluyen papas rayadas')
        c.setFillColor(HexColor(AMBER))
        c.setFont('Bangers', 30)
        c.drawCentredString(w / 2, 232, 'TODAS A $6.99')
        c.setFillColor(HexColor(AMBER))
        c.rect(0, 0, w, 124, stroke=0, fill=1)
        c.setFillColor(HexColor(CARBON))
        c.setFont('Bangers', 22)
        c.drawCentredString(w / 2, 82, 'PEDIDOS POR WHATSAPP')
        c.setFont('Bangers', 44)
        c.drawCentredString(w / 2, 44, '+58 414-700-9402')
        c.setFont('Lato-Bold', 8)
        c.drawCentredString(w / 2, 22, 'Disponible hasta las 7:00 PM · ' + INSTAGRAM)

    def header(c, d):
        w, h = A4
        c.setFillColor(HexColor(CARBON))
        c.setFont('Bangers', 16)
        c.drawString(54, h - 48, 'MENÚ SIMPLEX')
        c.setFillColor(HexColor(MUTED))
        c.setFont('Lato-Bold', 9)
        c.drawRightString(w - 54, h - 46, 'Lunes a viernes · hasta las 7:00 PM')
        c.setStrokeColor(HexColor(AMBER))
        c.setLineWidth(3)
        c.line(54, h - 56, w - 54, h - 56)

    def footer(c, d):
        w, h = A4
        c.setStrokeColor(HexColor(CEMENT))
        c.setLineWidth(0.75)
        c.line(54, 52, w - 54, 52)
        c.setFillColor(HexColor(MUTED))
        c.setFont('Lato', 8.5)
        c.drawString(54, 36, 'Menú Simplex · Solo lunes a viernes hasta las 7:00 PM')
        c.setFont('Lato-Bold', 8.5)
        c.drawRightString(w - 54, 36, 'WhatsApp ' + WHATSAPP)
        c.setFont('Lato', 8)
        c.drawCentredString(w / 2, 36, str(c.getPageNumber()))

    def simplex_sections():
        for cat in data['categorias']:
            yield from category_block(
                cat['nombre'],
                [{'nombre': i['nombre'], 'precio': f"${i['precio']:.2f}", 'ingredientes': i['ingredientes']} for i in cat['items']],
            )

    doc.build(
        [
            PageBreak(),
            Paragraph(
                '<font name="Lato-Bold" size="10" color="' + WOOD + '">Solo lunes a viernes, '
                'hasta las 7:00 PM. Todas las hamburguesas incluyen papas rayadas.</font>',
                ST_INTRO,
            ),
            Spacer(1, 12),
        ]
        + list(simplex_sections()),
        onFirstPage=cover,
        onLaterPages=header,
    )
    return out


def main():
    register_fonts()
    dahaus = build_dahaus()
    simplex = build_simplex()
    print(f'OK  {dahaus}')
    print(f'OK  {simplex}')


if __name__ == '__main__':
    main()