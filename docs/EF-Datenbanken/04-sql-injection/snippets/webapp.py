from flask import Flask, request, url_for
import psycopg2

app = Flask(__name__)
pg = psycopg2.connect(host='...', database='xkcd', user='ef_2024', password='ef_gbsl_2024', port=32601)

COMIC = {
    'id': 0,
    'title': 1,
    'transcript': 2,
    'alt': 3,
    'image': 4,
    'url': 5,
    'day': 6,
    'month': 7,
    'year': 8,
    'news': 9,
    'created_at': 10,
}

def document(content):
    return f'''
<!DOCTYPE html>
<meta charset="UTF-8">
<header>
    <title>SQL Injection</title>
    <link rel="stylesheet" href="{url_for('static', filename='style.css')}">
</header>
<body>
    {content}
</body>
    '''

def query(sql):
    cur = pg.cursor()
    try:
        cur.execute(sql)
        return cur.fetchall()
    except:
        return []
    finally:
        cur.close()

@app.route('/', methods=['GET'])
def hello():
    commics = query('SELECT * FROM comics ORDER BY id DESC LIMIT 1')[0]
    print(commics)
    html = document(f'''
        <h1>XKCD</h1>
        <h2>{commics[COMIC["title"]]}</h2>
        <img src="{commics[COMIC["image"]]}">
        <div>
            <a href="{commics[COMIC["url"]]}">👉 Link</a>
        </div>
        <p>{commics[COMIC["transcript"]]}</p>

        <form action="/suche" method="GET">
            <input type="text" name="search">
            <input type="submit" value="Suchen">
        </form>
    ''')
    return html


@app.route('/suche', methods=['GET'])
def suche():
    search = request.args.get('search')
    sql = f"SELECT * FROM comics WHERE title ILIKE '%{search}%' ORDER BY id DESC LIMIT 4"
    comics = query(sql)

    comics_html = []
    for comic in comics:
        comics_html.append(f'''
            <div class="comic">
                <h2>{comic[COMIC["title"]]}</h2>
                <img src="{comic[COMIC["image"]]}">
                <div>
                    <a href="{comic[COMIC["url"]]}">👉 Link</a>
                </div>    
            </div>
        ''')
    raw_html = '\n'.join(comics_html)

    html = document(f'''
        <h1>XKCD</h1>
        <pre><code>{sql}</code></pre>
        <form action="/suche" method="GET">
            <input type="text" name="search">
            <input type="submit" value="Suchen">
        </form>
        <div class="comics">
            {raw_html}
        </div>
    ''')
    return html