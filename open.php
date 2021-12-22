<?php
    include_once('php/funciones.php');
    $DB_Server = "localhost"; 
    $DB_Username = "root"; 
    $DB_Password = "tigla010227";               
    $DB_DBName = "VTA";         
    $DB_TBLName = "task"; 
    $filename = "inventario ".date("Y-m-d");         

    $sql = "Select * from " . $DB_TBLName . " ORDER BY CLOCK_IN ASC";//Agregar MIN
    $Connect = @mysql_connect($DB_Server, $DB_Username, $DB_Password) or die("Couldn't connect to MySQL:<br>" . mysql_error() . "<br>" . mysql_errno());

    $Db = @mysql_select_db($DB_DBName, $Connect) or die("Couldn't select database:<br>" . mysql_error(). "<br>" . mysql_errno());   

    $result = @mysql_query($sql,$Connect) or die("Couldn't execute query:<br>" . mysql_error(). "<br>" . mysql_errno());    
    $file_ending = "xls";

    header("Content-Type: application/xls");    
    header("Content-Disposition: attachment; filename=$filename.csv");  
    header("Pragma: no-cache"); 
    header("Expires: 0");


    /*******Formato******/   

    $sep = ","; //Separador

    //Nombre columnas
    for ($i = 0; $i < mysql_num_fields($result); $i++){
        echo mysql_field_name($result,$i) . ",";
    }
    print("\n");    

    //Impresion datos
    while($row = mysql_fetch_row($result)){
        $schema_insert = "";
        for($j=0; $j<mysql_num_fields($result);$j++){
            if(!isset($row[$j]))
                $schema_insert .= "NULL".$sep;
            elseif ($row[$j] != "")
                $schema_insert .= "$row[$j]".$sep;
            else
                $schema_insert .= "".$sep;
        }
        $schema_insert = str_replace($sep."$", "", $schema_insert);
        $schema_insert = preg_replace("/\r\n|\n\r|\n|\r/", " ", $schema_insert);
        $schema_insert .= ",";
        print(trim($schema_insert));
        print "\n";
    }   
    //redirect("export.php");
?>