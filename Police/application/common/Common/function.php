<?php
 
function printArray($exportarray){
	header("content-type:text/html;charset=utf-8"); 
	//以HTML表格的形式输出二维数组中的每个元素
    echo '<table border="1" width="600" align="center">';
    echo '<caption><h1> </h1></caption>';
    echo '<tr bgcolor="#dddddd">';
    echo '</tr>';
	for($row=0;$row<count($exportarray);$row++)
	    {
	        echo '<tr>';
	        //使用内层循环遍历数组$contact1 中 子数组的每个元素,使用count()函数控制循环次数
	        for($col=0;$col<count($exportarray[$row]);$col++)
	        {
	            echo '<td>'.$exportarray[$row][$col].'</td>';
	        }
	        echo '</tr>';
	    }
	    echo '</table>';
}

?> 