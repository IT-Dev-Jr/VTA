<?php
    require_once('php/funciones/regeneracion.php');
    require_once('php/funciones/globales.php');

    if(isset($_SESSION['online']))redirect('php/interface/home.php');
    elseif(isset($_SESSION['admin']))redirect('php/supervisores/home.php');
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

                if(!isset($_GET['code'])){
                    die('<center><h1><font color="red">Codigo Invalido.</font></h1></center>');
                }elseif(isset($_GET['code'])){
                    if($_GET['code']!='051$!f513'){
                        die('<center><h1><font color="red">Codigo Invalido.</font></h1></center>');
                    }
                }
            ?>
            <form action="php/login/autentificacion.php" method="POST">
                <input type="password" id="code" placeholder="Escanea tu codigo de empleado" name="id_empleado" autofocus required><br>
                <input type="submit" value="Entrada">
            </form>
        </div>
    </body>
</html>