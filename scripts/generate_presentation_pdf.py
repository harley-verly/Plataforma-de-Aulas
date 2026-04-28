from __future__ import annotations

import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

REPO_ROOT = Path(__file__).resolve().parents[1]
CODEX_ROOT = Path(__file__).resolve().parents[3]
PYTHON_LIBS = CODEX_ROOT / "pythonlibs"

if PYTHON_LIBS.exists():
    sys.path.insert(0, str(PYTHON_LIBS))

from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader, simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

import fitz


@dataclass(frozen=True)
class Chapter:
    id: str
    eyebrow: str
    title: str
    summary: str
    description: str
    features: list[str]
    screenshot: Path
    cta_label: str | None = None
    live_demo_url: str | None = None


@dataclass(frozen=True)
class OfferTier:
    label: str
    deadline_hours: int
    price_original: int
    price_current: int
    beta_days: int
    final_days: int
    support_days: int


PAGESIZE = landscape(A4)
PAGE_WIDTH, PAGE_HEIGHT = PAGESIZE
MARGIN_X = 34
MARGIN_Y = 28
HEADER_H = 42
FOOTER_H = 20
CONTENT_TOP = PAGE_HEIGHT - MARGIN_Y - HEADER_H
CONTENT_BOTTOM = MARGIN_Y + FOOTER_H
CONTENT_HEIGHT = CONTENT_TOP - CONTENT_BOTTOM
FOOTER_LINE_Y = 24
FOOTER_TEXT_Y = 11
CTA_SAFE_Y = 78

BG = HexColor("#0B0B0D")
PANEL = HexColor("#17171A")
PANEL_SOFT = HexColor("#1F1F23")
GOLD = HexColor("#C9A24B")
GOLD_SOFT = HexColor("#E6CB7C")
TEXT = HexColor("#F1E9DA")
TEXT_SOFT = HexColor("#D8CEBC")
TEXT_MUTED = HexColor("#BBAF99")
LINE = HexColor("#3A2D21")
SUCCESS = HexColor("#8C7650")

OUTPUT_DIR = REPO_ROOT / "output" / "pdf"
PDF_PATH = OUTPUT_DIR / "apresentacao-comercial-plataforma-de-aulas.pdf"
PREVIEW_DIR = OUTPUT_DIR / "apresentacao-comercial-plataforma-de-aulas-preview"
CONTACT_SHEET = PREVIEW_DIR / "contact-sheet.png"

LOGO_PATH = REPO_ROOT / "apps" / "web" / "public" / "logo-aba.png"
SCREENSHOT_DIR = REPO_ROOT / "apps" / "web" / "src" / "assets" / "presentation"

TITLE_FONT = "Georgia"
TITLE_FONT_BOLD = "Georgia-Bold"
BODY_FONT = "Arial"
BODY_FONT_BOLD = "Arial-Bold"


GATE_TITLE = "Apresentação Comercial para Criação de Plataforma de cursos, marketplace e comunidade, proprietária."
GATE_SUBTITLE = "A melhor oportunidade é para quem decide rápido e sabe o que quer!"
GATE_STEPS = [
    (
        "1. Vamos nos conhecer",
        "Precisamos do seu nome, e-mail e whatsapp, para formalizar a proposta."
    ),
    (
        "2. Entenda a Plataforma",
        "Navegue pela apresentação, com explicações práticas e rápidas sobre o desenvolvimento da plataforma."
    ),
    (
        "3. Seja Ágil",
        "Quanto mais rápido tomar a decisão, melhor a oferta que vai aproveitar."
    )
]

CHAPTERS: list[Chapter] = [
    Chapter(
        id="visao-geral",
        eyebrow="Posicionamento do produto",
        title="Uma plataforma proprietária para transformar cursos em marca, experiência e receita.",
        summary="Aqui, o cliente não compra apenas telas bonitas: compra um produto digital capaz de organizar a operação, valorizar a percepção da marca e sustentar crescimento.",
        description="A Plataforma de Aulas foi pensada para unir vitrine comercial, experiência do aluno e retaguarda operacional em um mesmo ecossistema. O resultado é um produto com cara de marca forte, não de solução improvisada.",
        features=[
            "Marca própria, visual premium e autoridade percebida desde o primeiro acesso.",
            "Estrutura pensada para vender, entregar conteúdo e operar sem remendos.",
            "Experiência mais forte para aluno, equipe interna e gestão em uma única base.",
            "Projeto preparado para crescer como ativo digital do cliente, e não como ferramenta descartável."
        ],
        screenshot=SCREENSHOT_DIR / "chapter-home.png",
        cta_label="Abrir homepage da plataforma",
        live_demo_url="https://aulas.abasolucoesetecnologia.com.br/"
    ),
    Chapter(
        id="experiencia-publica",
        eyebrow="Primeira impressão que converte",
        title="A fachada pública foi desenhada para gerar confiança antes mesmo da matrícula.",
        summary="Uma apresentação forte aumenta o valor percebido do curso, transmite autoridade e afasta a sensação de estar diante de um software genérico.",
        description="Quando a vitrine é bem resolvida, a marca parece maior, o conteúdo parece mais valioso e a decisão de compra fica mais fácil. É essa camada que transforma visita em interesse real.",
        features=[
            "Visual editorial premium para posicionar a marca acima do padrão comum do mercado.",
            "Navegação clara para conduzir o visitante do interesse à oferta.",
            "Ambiente pronto para receber prova social, copy comercial e campanhas de aquisição.",
            "Estrutura que comunica organização, seriedade e valor já na primeira dobra."
        ],
        screenshot=SCREENSHOT_DIR / "chapter-community.png",
        cta_label="Abrir vitrine pública",
        live_demo_url="https://aulas.abasolucoesetecnologia.com.br/comunidade"
    ),
    Chapter(
        id="catalogo-e-cursos",
        eyebrow="Oferta organizada para vender melhor",
        title="Catálogo e páginas de curso preparados para transformar interesse em matrícula.",
        summary="A plataforma organiza vitrine, detalhes do produto e consumo de conteúdo de forma coerente, valorizando a oferta sem dispersar a atenção.",
        description="Em vez de confundir o usuário, o catálogo concentra o olhar no que importa: clareza da oferta, leitura rápida dos diferenciais e um caminho natural para a decisão.",
        features=[
            "Catálogo com leitura comercial imediata e foco em produtos que precisam vender.",
            "Página de curso com espaço para narrativa, oferta, cronograma e autoridade.",
            "Continuidade visual entre descoberta, avaliação e acesso ao conteúdo.",
            "Base conectada ao backend para que a proposta parta de algo tangível."
        ],
        screenshot=SCREENSHOT_DIR / "chapter-courses.png",
        cta_label="Abrir catálogo",
        live_demo_url="https://aulas.abasolucoesetecnologia.com.br/cursos"
    ),
    Chapter(
        id="painel-e-operacao",
        eyebrow="Governança e controle",
        title="Uma operação mais segura, mais clara e muito mais profissional.",
        summary="O painel administrativo mostra que a plataforma não pensa só na vitrine: ela também cuida de gestão, leitura operacional e evolução do produto.",
        description="Quem vende cursos precisa de mais do que um front bonito. Precisa de controle, visão executiva e facilidade para acompanhar conteúdo, rotinas e crescimento da operação.",
        features=[
            "Painel com leitura executiva para decisões mais rápidas.",
            "Base pronta para evoluir com workflows, aprovações e gestão de conteúdo.",
            "Navegação interna consistente para reduzir atrito no uso diário.",
            "Experiência que transmite maturidade operacional ao cliente e à equipe."
        ],
        screenshot=SCREENSHOT_DIR / "chapter-admin-dashboard.png",
        cta_label="Abrir painel administrativo",
        live_demo_url="https://aulas.abasolucoesetecnologia.com.br/admin"
    ),
    Chapter(
        id="demo-atual",
        eyebrow="Risco percebido menor",
        title="A contratação parte de uma base viva, não de uma promessa em branco.",
        summary="Hoje já existe uma demonstração funcional para apresentar o produto, validar a direção visual e reduzir a insegurança na decisão.",
        description="Isso encurta o caminho entre proposta e execução. Em vez de vender apenas conceito, a apresentação mostra um ambiente que já respira o produto final.",
        features=[
            "Demonstração real já publicada e pronta para ser apresentada.",
            "Rotas principais já conectadas ao backend nas áreas centrais.",
            "Direção visual consolidada como base oficial do projeto.",
            "Mais confiança para contratar, porque o ponto de partida já é concreto."
        ],
        screenshot=SCREENSHOT_DIR / "chapter-admin-courses.png",
        cta_label="Ver demonstração atual",
        live_demo_url="https://aulas.abasolucoesetecnologia.com.br/admin/cursos"
    ),
    Chapter(
        id="entrega-final",
        eyebrow="Transformação contratada",
        title="A versão contratada leva o demo para um produto pronto para operar com confiança.",
        summary="O contrato não entrega apenas acabamento visual: entrega consolidação da experiência, refinamento operacional e entrada assistida em produção.",
        description="A próxima fase transforma a base validada em um produto maduro, com ajustes sob medida, rodadas de testes e suporte para que a implantação ganhe estabilidade e valor percebido.",
        features=[
            "Refinamento da experiência pública, interna e administrativa com padrão premium.",
            "Customizações alinhadas à marca, à operação e às prioridades do cliente.",
            "Rodada de testes para reduzir ruído e amadurecer a entrega final.",
            "Acompanhamento pós-entrega para atravessar a fase inicial com mais segurança."
        ],
        screenshot=SCREENSHOT_DIR / "chapter-admin-media.png"
    ),
    Chapter(
        id="condicoes-comerciais",
        eyebrow="Decisão, prazo e condição",
        title="A proposta combina investimento, velocidade de entrega e acompanhamento pós-compra.",
        summary="A janela comercial foi pensada para favorecer uma decisão mais rápida sem abrir mão de previsibilidade, qualidade de execução e suporte.",
        description="Quanto mais cedo a contratação avança, melhor a condição de entrada e mais agressivo pode ser o cronograma de implantação. Isso cria vantagem real para quem decide no momento certo.",
        features=[
            "Desconto mais forte e beta mais curto para entrada imediata via PIX.",
            "Faixas progressivas para preservar previsibilidade mesmo fora da primeira janela.",
            "Prazo de fase final claramente definido, sem promessa vaga.",
            "Período de acompanhamento pós-compra para dar segurança à implantação."
        ],
        screenshot=SCREENSHOT_DIR / "chapter-course-detail.png",
        cta_label="Ver página de curso",
        live_demo_url="https://aulas.abasolucoesetecnologia.com.br/cursos/operacao-premium-de-cursos"
    )
]

OFFER_TIERS = [
    OfferTier(
        label="Condição executiva de 24 horas",
        deadline_hours=24,
        price_original=2500000,
        price_current=2000000,
        beta_days=15,
        final_days=30,
        support_days=90
    ),
    OfferTier(
        label="Condição estratégica de 48 horas",
        deadline_hours=48,
        price_original=2500000,
        price_current=2200000,
        beta_days=30,
        final_days=45,
        support_days=60
    ),
    OfferTier(
        label="Condição padrão de contratação",
        deadline_hours=72,
        price_original=2500000,
        price_current=2500000,
        beta_days=45,
        final_days=60,
        support_days=30
    )
]


def register_fonts() -> None:
    fonts = {
        TITLE_FONT: Path(r"C:\Windows\Fonts\georgia.ttf"),
        TITLE_FONT_BOLD: Path(r"C:\Windows\Fonts\georgiab.ttf"),
        BODY_FONT: Path(r"C:\Windows\Fonts\arial.ttf"),
        BODY_FONT_BOLD: Path(r"C:\Windows\Fonts\arialbd.ttf")
    }
    for name, path in fonts.items():
        if name not in pdfmetrics.getRegisteredFontNames() and path.exists():
            pdfmetrics.registerFont(TTFont(name, str(path)))


def format_currency(value_in_cents: int) -> str:
    inteiro = value_in_cents // 100
    centavos = value_in_cents % 100
    inteiro_formatado = f"{inteiro:,}".replace(",", ".")
    return f"R$ {inteiro_formatado},{centavos:02d}"


def draw_background(pdf: canvas.Canvas) -> None:
    pdf.setFillColor(BG)
    pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, stroke=0, fill=1)


def draw_header(pdf: canvas.Canvas, page_label: str) -> None:
    y = PAGE_HEIGHT - MARGIN_Y
    if LOGO_PATH.exists():
        pdf.drawImage(str(LOGO_PATH), MARGIN_X, y - 32, width=32, height=32, mask="auto")
    pdf.setFillColor(TEXT)
    pdf.setFont(TITLE_FONT_BOLD, 18)
    pdf.drawString(MARGIN_X + 44, y - 12, "ACMB")
    pdf.setFillColor(TEXT_MUTED)
    pdf.setFont(BODY_FONT, 7.5)
    pdf.drawString(MARGIN_X + 116, y - 10.5, "EST. 1998")
    pdf.setFillColor(GOLD)
    pdf.setFont(BODY_FONT_BOLD, 9)
    pdf.drawRightString(PAGE_WIDTH - MARGIN_X, y - 11, page_label.upper())
    pdf.setStrokeColor(Color(LINE.red, LINE.green, LINE.blue, alpha=0.75))
    pdf.setLineWidth(1)
    pdf.line(MARGIN_X, y - 40, PAGE_WIDTH - MARGIN_X, y - 40)


def draw_footer(pdf: canvas.Canvas, page_number: int) -> None:
    pdf.setStrokeColor(Color(LINE.red, LINE.green, LINE.blue, alpha=0.75))
    pdf.line(MARGIN_X, MARGIN_Y + 10, PAGE_WIDTH - MARGIN_X, MARGIN_Y + 10)
    pdf.setFillColor(TEXT_MUTED)
    pdf.setFont(BODY_FONT, 8)
    pdf.drawString(MARGIN_X, MARGIN_Y - 2, "Plataforma de Aulas — apresentação comercial em PDF")
    pdf.drawRightString(PAGE_WIDTH - MARGIN_X, MARGIN_Y - 2, f"Página {page_number}")


def draw_footer(pdf: canvas.Canvas, page_number: int) -> None:
    pdf.setStrokeColor(Color(LINE.red, LINE.green, LINE.blue, alpha=0.75))
    pdf.line(MARGIN_X, FOOTER_LINE_Y, PAGE_WIDTH - MARGIN_X, FOOTER_LINE_Y)
    pdf.setFillColor(TEXT_MUTED)
    pdf.setFont(BODY_FONT, 8)
    pdf.drawString(MARGIN_X, FOOTER_TEXT_Y, "Plataforma de Aulas â€” apresentação comercial em PDF")
    pdf.drawRightString(PAGE_WIDTH - MARGIN_X, FOOTER_TEXT_Y, f"Página {page_number}")


def draw_footer(pdf: canvas.Canvas, page_number: int) -> None:
    pdf.setStrokeColor(Color(LINE.red, LINE.green, LINE.blue, alpha=0.75))
    pdf.line(MARGIN_X, FOOTER_LINE_Y, PAGE_WIDTH - MARGIN_X, FOOTER_LINE_Y)
    pdf.setFillColor(TEXT_MUTED)
    pdf.setFont(BODY_FONT, 8)
    pdf.drawString(MARGIN_X, FOOTER_TEXT_Y, "Plataforma de Aulas - apresentação comercial em PDF")
    pdf.drawRightString(PAGE_WIDTH - MARGIN_X, FOOTER_TEXT_Y, f"Página {page_number}")


def draw_label(pdf: canvas.Canvas, text: str, x: float, y: float) -> float:
    pdf.setFillColor(GOLD)
    pdf.setFont(BODY_FONT_BOLD, 9)
    pdf.drawString(x, y, text.upper())
    return y - 8


def draw_paragraph(
    pdf: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    font_name: str,
    font_size: float,
    color: Color,
    leading: float | None = None,
    max_lines: int | None = None,
) -> float:
    lines = simpleSplit(text, font_name, font_size, width)
    if max_lines is not None:
        lines = lines[:max_lines]
    pdf.setFillColor(color)
    pdf.setFont(font_name, font_size)
    actual_leading = leading or font_size * 1.35
    current_y = y
    for line in lines:
        pdf.drawString(x, current_y, line)
        current_y -= actual_leading
    return current_y


def draw_title(
    pdf: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    size: float,
    leading: float,
) -> float:
    lines = simpleSplit(text, TITLE_FONT, size, width)
    pdf.setFillColor(TEXT)
    pdf.setFont(TITLE_FONT, size)
    current_y = y
    for line in lines:
        pdf.drawString(x, current_y, line)
        current_y -= leading
    return current_y


def draw_panel(pdf: canvas.Canvas, x: float, y_top: float, width: float, height: float, fill: Color = PANEL) -> None:
    pdf.setFillColor(fill)
    pdf.setStrokeColor(LINE)
    pdf.setLineWidth(1)
    pdf.rect(x, y_top - height, width, height, stroke=1, fill=1)


def fit_image_box(image_path: Path, box_width: float, box_height: float) -> tuple[float, float]:
    reader = ImageReader(str(image_path))
    img_w, img_h = reader.getSize()
    ratio = min(box_width / img_w, box_height / img_h)
    return img_w * ratio, img_h * ratio


def draw_screenshot(pdf: canvas.Canvas, image_path: Path, x: float, y_top: float, width: float, height: float) -> None:
    draw_panel(pdf, x, y_top, width, height, fill=PANEL_SOFT)
    inner_pad = 10
    draw_panel(pdf, x + inner_pad, y_top - inner_pad, width - inner_pad * 2, height - inner_pad * 2, fill=BG)
    target_w = width - inner_pad * 4
    target_h = height - inner_pad * 4
    img_w, img_h = fit_image_box(image_path, target_w, target_h)
    img_x = x + (width - img_w) / 2
    img_y = y_top - inner_pad * 2 - img_h
    pdf.drawImage(str(image_path), img_x, img_y, width=img_w, height=img_h, preserveAspectRatio=True, mask="auto")


def draw_feature_card(pdf: canvas.Canvas, text: str, x: float, y_top: float, width: float, height: float) -> None:
    draw_panel(pdf, x, y_top, width, height, fill=Color(BG.red, BG.green, BG.blue, alpha=0.55))
    draw_paragraph(pdf, text, x + 12, y_top - 22, width - 24, BODY_FONT, 11, TEXT_SOFT, leading=15)


def draw_offer_tier_card(pdf: canvas.Canvas, tier: OfferTier, x: float, y_top: float, width: float, height: float, highlighted: bool) -> None:
    fill = Color(0.22, 0.17, 0.10, alpha=0.92) if highlighted else PANEL_SOFT
    stroke = GOLD if highlighted else LINE
    pdf.setFillColor(fill)
    pdf.setStrokeColor(stroke)
    pdf.rect(x, y_top - height, width, height, stroke=1, fill=1)
    pdf.setFillColor(GOLD if highlighted else TEXT_SOFT)
    pdf.setFont(BODY_FONT_BOLD, 9)
    pdf.drawString(x + 16, y_top - 22, tier.label.upper())
    pdf.setFillColor(TEXT_MUTED)
    pdf.setFont(BODY_FONT, 8)
    pdf.drawRightString(x + width - 16, y_top - 22, f"ATÉ {tier.deadline_hours}H")
    pdf.setFillColor(GOLD_SOFT if highlighted else TEXT)
    pdf.setFont(TITLE_FONT, 24)
    pdf.drawString(x + 16, y_top - 58, format_currency(tier.price_current))
    draw_paragraph(
        pdf,
        f"Beta em {tier.beta_days} dias, fase final em {tier.final_days} dias e {tier.support_days} dias de acompanhamento pós-compra.",
        x + 16,
        y_top - 84,
        width - 32,
        BODY_FONT,
        10.5,
        TEXT_MUTED,
        leading=14
    )


def add_cover_page(pdf: canvas.Canvas, page_number: int) -> None:
    draw_background(pdf)
    draw_header(pdf, "Apresentação comercial")

    left_x = MARGIN_X
    hero_y = CONTENT_TOP - 18
    draw_label(pdf, "Apresentação comercial", left_x, hero_y)
    hero_y -= 22
    hero_end_y = draw_title(pdf, GATE_TITLE, left_x, hero_y, 430, 24, 29)
    subtitle_end_y = draw_paragraph(
        pdf,
        GATE_SUBTITLE,
        left_x,
        hero_end_y - 12,
        430,
        BODY_FONT_BOLD,
        15,
        TEXT_SOFT,
        leading=22
    )
    draw_paragraph(
        pdf,
        "Este PDF consolida todo o conteúdo da proposta digital em um material comercial fechado, com a mesma linguagem visual da apresentação publicada.",
        left_x,
        subtitle_end_y - 8,
        430,
        BODY_FONT,
        12.5,
        TEXT_MUTED,
        leading=19
    )

    right_x = 520
    card_y = CONTENT_TOP - 10
    draw_panel(pdf, right_x, card_y, PAGE_WIDTH - MARGIN_X - right_x, 168, fill=PANEL_SOFT)
    draw_label(pdf, "Condição reservada", right_x + 18, card_y - 26)
    pdf.setFillColor(TEXT)
    pdf.setFont(TITLE_FONT, 17)
    draw_paragraph(
        pdf,
        OFFER_TIERS[0].label,
        right_x + 18,
        card_y - 54,
        PAGE_WIDTH - MARGIN_X - right_x - 36,
        TITLE_FONT,
        17,
        TEXT,
        leading=20
    )
    draw_paragraph(
        pdf,
        f"{format_currency(OFFER_TIERS[0].price_current)} para transformar a Plataforma de Aulas em uma entrega premium, com beta em {OFFER_TIERS[0].beta_days} dias, fase final em {OFFER_TIERS[0].final_days} dias e {OFFER_TIERS[0].support_days} dias de acompanhamento.",
        right_x + 18,
        card_y - 86,
        PAGE_WIDTH - MARGIN_X - right_x - 36,
        BODY_FONT,
        10.5,
        TEXT_SOFT,
        leading=15
    )

    steps_y = 314
    draw_panel(pdf, left_x, steps_y, PAGE_WIDTH - (MARGIN_X * 2), 162, fill=PANEL)
    draw_label(pdf, "Como vamos conduzir esta apresentação", left_x + 18, steps_y - 24)
    card_width = (PAGE_WIDTH - (MARGIN_X * 2) - 18 * 4) / 3
    card_height = 92
    card_y = steps_y - 56
    for idx, (title, description) in enumerate(GATE_STEPS):
        card_x = left_x + 18 + idx * (card_width + 18)
        draw_feature_card(pdf, f"{title}\n\n{description}", card_x, card_y, card_width, card_height)

    bottom_y = 138
    draw_panel(pdf, left_x, bottom_y, PAGE_WIDTH - (MARGIN_X * 2), 74, fill=PANEL_SOFT)
    draw_label(pdf, "O que este PDF entrega", left_x + 18, bottom_y - 22)
    draw_paragraph(
        pdf,
        "Uma visão comercial completa da Plataforma de Aulas, com identidade visual alinhada à proposta publicada, argumentos de valor por capítulo e condições de contratação organizadas para apresentação ao cliente.",
        left_x + 18,
        bottom_y - 48,
        PAGE_WIDTH - (MARGIN_X * 2) - 36,
        BODY_FONT,
        11.5,
        TEXT_SOFT,
        leading=16
    )
    draw_footer(pdf, page_number)
    pdf.showPage()


def add_chapter_page(pdf: canvas.Canvas, chapter: Chapter, chapter_index: int, total: int, page_number: int) -> None:
    draw_background(pdf)
    draw_header(pdf, f"Bloco {chapter_index + 1:02d}")

    left_x = MARGIN_X
    top_y = CONTENT_TOP - 10
    text_width = 420
    screenshot_x = left_x + text_width + 26
    screenshot_w = PAGE_WIDTH - MARGIN_X - screenshot_x

    draw_label(pdf, chapter.eyebrow, left_x, top_y)
    pdf.setFillColor(TEXT_MUTED)
    pdf.setFont(BODY_FONT, 9)
    pdf.drawString(left_x, top_y - 24, f"BLOCO {chapter_index + 1} DE {total}")
    pdf.drawString(left_x + 118, top_y - 24, "ARGUMENTO DE VALOR")
    title_end = draw_title(pdf, chapter.title, left_x, top_y - 58, text_width, 24, 29)
    summary_end = draw_paragraph(pdf, chapter.summary, left_x, title_end - 8, text_width, BODY_FONT_BOLD, 12.5, TEXT_SOFT, leading=18)
    desc_end = draw_paragraph(pdf, chapter.description, left_x, summary_end - 10, text_width, BODY_FONT, 11.5, TEXT_MUTED, leading=17)

    feature_top = desc_end - 8
    feature_w = (text_width - 12) / 2
    feature_h = 84
    for idx, feature in enumerate(chapter.features):
        row = idx // 2
        col = idx % 2
        card_x = left_x + col * (feature_w + 12)
        card_y = feature_top - row * (feature_h + 12)
        draw_feature_card(pdf, feature, card_x, card_y, feature_w, feature_h)

    if chapter.cta_label and chapter.live_demo_url:
        cta_y = max(CTA_SAFE_Y, feature_top - 2 * (feature_h + 12) - 6)
        pdf.setFillColor(GOLD_SOFT)
        pdf.setStrokeColor(GOLD)
        pdf.rect(left_x, cta_y - 18, 220, 30, stroke=1, fill=1)
        pdf.setFillColor(BG)
        pdf.setFont(BODY_FONT_BOLD, 9)
        pdf.drawString(left_x + 14, cta_y - 7, chapter.cta_label.upper())
        draw_paragraph(pdf, chapter.live_demo_url, left_x + 240, cta_y - 6, 210, BODY_FONT, 8.25, TEXT_MUTED, leading=12)

    draw_screenshot(pdf, chapter.screenshot, screenshot_x, top_y, screenshot_w, 286)
    draw_panel(pdf, screenshot_x, top_y - 304, screenshot_w, 86, fill=PANEL_SOFT)
    draw_paragraph(
        pdf,
        "Recorte real do ambiente que dá materialidade a esta proposta comercial.",
        screenshot_x + 14,
        top_y - 332,
        screenshot_w - 28,
        BODY_FONT,
        11,
        TEXT_SOFT,
        leading=16
    )

    draw_footer(pdf, page_number)
    pdf.showPage()


def add_commercial_page(pdf: canvas.Canvas, page_number: int) -> None:
    draw_background(pdf)
    draw_header(pdf, "Condição comercial")

    left_x = MARGIN_X
    top_y = CONTENT_TOP - 12
    draw_label(pdf, "Condição comercial", left_x, top_y)
    title_end = draw_title(
        pdf,
        "Investimento, prazo e acompanhamento pensados para transformar decisão em implantação com confiança.",
        left_x,
        top_y - 34,
        560,
        24,
        29
    )
    draw_paragraph(
        pdf,
        "As faixas progressivas preservam clareza comercial, mas favorecem quem decide mais cedo. Isso reduz tempo de implantação, melhora a condição de entrada e mantém previsibilidade do projeto.",
        left_x,
        title_end - 8,
        560,
        BODY_FONT,
        12,
        TEXT_SOFT,
        leading=18
    )

    summary_y = top_y - 4
    summary_x = 598
    draw_panel(pdf, summary_x, summary_y, PAGE_WIDTH - MARGIN_X - summary_x, 128, fill=PANEL_SOFT)
    draw_label(pdf, "Condição executiva atual", summary_x + 18, summary_y - 24)
    draw_paragraph(
        pdf,
        OFFER_TIERS[0].label,
        summary_x + 18,
        summary_y - 48,
        PAGE_WIDTH - MARGIN_X - summary_x - 36,
        TITLE_FONT,
        16,
        TEXT,
        leading=18
    )
    pdf.setFillColor(GOLD_SOFT)
    pdf.setFont(TITLE_FONT, 21)
    pdf.drawString(summary_x + 18, summary_y - 84, format_currency(OFFER_TIERS[0].price_current))
    pdf.setFillColor(TEXT_SOFT)
    pdf.setFont(BODY_FONT_BOLD, 9)
    pdf.drawString(summary_x + 18, summary_y - 100, "via PIX")

    cards_y = top_y - 160
    total_w = PAGE_WIDTH - MARGIN_X * 2
    gap = 14
    card_w = (total_w - gap * 2) / 3
    for idx, tier in enumerate(OFFER_TIERS):
        draw_offer_tier_card(pdf, tier, left_x + idx * (card_w + gap), cards_y, card_w, 132, idx == 0)

    rail_y = cards_y - 146
    draw_panel(pdf, left_x, rail_y, total_w, 122, fill=PANEL)
    draw_label(pdf, "O que o cliente recebe ao contratar", left_x + 18, rail_y - 24)
    bullets = [
        "Versão beta com prazo claro, para acelerar validação e ajustes.",
        "Mais 15 dias de testes e customização antes da fase final.",
        "Acompanhamento pós-compra para absorver ruídos, bugs e estabilização inicial.",
        "Base proprietária pronta para crescer como ativo digital da operação."
    ]
    bullet_x = left_x + 18
    bullet_y = rail_y - 46
    for bullet in bullets:
        pdf.setFillColor(GOLD)
        pdf.circle(bullet_x + 3, bullet_y + 3, 2, stroke=0, fill=1)
        bullet_y = draw_paragraph(pdf, bullet, bullet_x + 12, bullet_y + 6, total_w - 60, BODY_FONT, 11, TEXT_SOFT, leading=16) - 4

    cta_y = 88
    draw_panel(pdf, left_x, cta_y, total_w, 46, fill=PANEL_SOFT)
    pdf.setFillColor(TEXT)
    pdf.setFont(TITLE_FONT, 15)
    pdf.drawString(left_x + 18, cta_y - 30, "Avanço comercial")
    draw_paragraph(
        pdf,
        "WhatsApp para negociação: +55 82 98109-3783 | Apresentação pública: aulas.abasolucoesetecnologia.com.br/apresentacao-comercial",
        left_x + 170,
        cta_y - 18,
        total_w - 188,
        BODY_FONT,
        9.5,
        TEXT_MUTED,
        leading=13
    )

    draw_footer(pdf, page_number)
    pdf.showPage()


def ensure_dirs() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)


def build_pdf() -> Path:
    register_fonts()
    ensure_dirs()
    pdf = canvas.Canvas(str(PDF_PATH), pagesize=PAGESIZE)
    pdf.setTitle("Apresentação Comercial - Plataforma de Aulas")
    pdf.setAuthor("Codex")
    pdf.setSubject("PDF comercial da apresentação da Plataforma de Aulas")

    page = 1
    add_cover_page(pdf, page)
    page += 1
    for idx, chapter in enumerate(CHAPTERS):
        add_chapter_page(pdf, chapter, idx, len(CHAPTERS), page)
        page += 1
    add_commercial_page(pdf, page)
    pdf.save()
    return PDF_PATH


def render_previews(pdf_path: Path) -> None:
    for item in PREVIEW_DIR.glob("page-*.png"):
        item.unlink()
    if CONTACT_SHEET.exists():
        CONTACT_SHEET.unlink()

    doc = fitz.open(pdf_path)
    image_paths: list[Path] = []
    for index in range(doc.page_count):
        page = doc.load_page(index)
        pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
        image_path = PREVIEW_DIR / f"page-{index + 1:02d}.png"
        pix.save(str(image_path))
        image_paths.append(image_path)
    doc.close()

    build_contact_sheet(image_paths, CONTACT_SHEET)


def build_contact_sheet(image_paths: Iterable[Path], output_path: Path) -> None:
    from PIL import Image, ImageDraw

    paths = list(image_paths)
    if not paths:
        return

    thumbs = []
    for path in paths:
        image = Image.open(path).convert("RGB")
        image.thumbnail((320, 220))
        thumbs.append((path, image))

    cols = 2
    rows = (len(thumbs) + cols - 1) // cols
    cell_w = 340
    cell_h = 250
    sheet = Image.new("RGB", (cols * cell_w, rows * cell_h), "#f5f1e8")
    draw = ImageDraw.Draw(sheet)

    for idx, (path, image) in enumerate(thumbs):
        row = idx // cols
        col = idx % cols
        x = col * cell_w + 10
        y = row * cell_h + 10
        sheet.paste(image, (x, y))
        draw.text((x, y + image.height + 8), path.stem, fill="#111111")

    sheet.save(output_path)


def main() -> None:
    pdf_path = build_pdf()
    render_previews(pdf_path)
    print(f"PDF gerado em: {pdf_path}")
    print(f"Previews em: {PREVIEW_DIR}")


if __name__ == "__main__":
    main()
