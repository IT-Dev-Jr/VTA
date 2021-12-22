<?php
    require_once('php/funciones/regeneracion.php');
    require_once('php/funciones/globales.php');

    if(isset($_SESSION['online']))redirect('php/interface/mainAdmon.php'); 
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>TiglaT|M</title>
        <link rel="shortcut icon" href="img/favicon.ico">
        <link rel="stylesheet" type="text/css" href="css/index.css">
    </head>
    <body>
        <div class="body"></div>
        <div class="grad"></div>
        <div class="header">
            <div>Tigla<span>T|M</span></div>
        </div>
        <br>
        <div class="login">
            <?php
                if(isset($_GET['err']))echo '<div class="error">'.$_GET['err'].'</div>'; 
                
            ?>
            <form action="php/login/autentificacionFs.php" method="POST">
                <input type="text" id="code" placeholder="Escanea tu codigo de empleado" name="id_empleado" autofocus required><br>
                <input type="hidden" name="forms"  value="Y"> 
                <input type="submit" value="Entrada">
            </form>
        </div>
    </body>
</html>