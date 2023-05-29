<?php
// Verifica se o formulário foi submetido
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtém os dados do formulário
    $nome = $_POST['nome'];
    $email = $_POST['email'];

    // Salva os dados em um arquivo CSV
    $dados = array($nome, $email);
    $linha = implode(',', $dados) . "\n";
    file_put_contents('dados.csv', $linha, FILE_APPEND);

    // Redireciona de volta para a página principal
    header('Location: index.html');
    exit;
}
?>
