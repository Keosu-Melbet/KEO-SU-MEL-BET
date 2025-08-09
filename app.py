import os
from flask import Flask, render_template, request, send_from_directory

app = Flask(__name__, static_folder="static", template_folder="templates")
app.secret_key = os.environ.get("SESSION_SECRET", "melbet-default-secret")

# Trang chủ
@app.route('/')
def index():
    return render_template('index.html')

# Trang FAQ
@app.route('/faq')
def faq():
    return render_template('faq.html')

# Trang liên hệ
@app.route('/contact')
def contact():
    return render_template('contact.html')

# Trang tìm kiếm
@app.route('/search')
def search():
    query = request.args.get("q")
    results = [
        {"title": "Kèo hôm nay", "slug": "keo-hom-nay"},
        {"title": "Phân tích trận MU vs Chelsea", "slug": "mu-chelsea"}
    ]
    return render_template("search.html", results=results, query=query)

# Trang bài viết động
@app.route('/article/<slug>')
def article(slug):
    article = {
        "title": "Phân tích trận MU vs Chelsea",
        "description": "Dự đoán tỷ số và kèo cược trận đấu hấp dẫn.",
        "image": "mu-chelsea.jpg",
        "date_published": "2025-08-08",
        "date_modified": "2025-08-08",
        "content": "<p>MU đang có phong độ cao, nhưng Chelsea lại có lợi thế sân nhà...</p>"
    }
    return render_template("article.html", article=article)

# Route favicon
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(
        os.path.join(app.root_path, 'static', 'images'),
        'favicon.ico',
        mimetype='image/vnd.microsoft.icon'
    )

# Route robots.txt
@app.route('/robots.txt')
def robots():
    return (
        "User-agent: *\n"
        "Disallow:\n"
        "Sitemap: https://yourdomain.com/sitemap.xml\n",
        200,
        {'Content-Type': 'text/plain'}
    )

# Route sitemap.xml
@app.route('/sitemap.xml')
def sitemap():
    pages = [
        {"loc": "https://yourdomain.com/", "lastmod": "2025-08-08"},
        {"loc": "https://yourdomain.com/faq", "lastmod": "2025-08-08"},
        {"loc": "https://yourdomain.com/contact", "lastmod": "2025-08-08"},
        {"loc": "https://yourdomain.com/search", "lastmod": "2025-08-08"},
        {"loc": "https://yourdomain.com/article/mu-chelsea", "lastmod": "2025-08-08"}
    ]
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for page in pages:
        xml += f"  <url>\n"
        xml += f"    <loc>{page['loc']}</loc>\n"
        xml += f"    <lastmod>{page['lastmod']}</lastmod>\n"
        xml += f"  </url>\n"
    xml += '</urlset>'
    return xml, 200, {'Content-Type': 'application/xml'}

# Xử lý lỗi 404
@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404

# Khởi chạy ứng dụng
if __name__ == '__main__':
    app.run()
