from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Obtenha os dados do formulário
        nome = request.form['nome']
        email = request.form['email']

        # Faça algo com os dados (por exemplo, salvar em um arquivo)
        with open('dados.txt', 'a') as arquivo:
            arquivo.write(f"Nome: {nome}\nEmail: {email}\n\n")

        return 'Obrigado por enviar o formulário!'
    
    # Se não houver solicitação POST, exiba o formulário
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
