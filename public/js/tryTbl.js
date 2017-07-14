tbl = "";
mT = 0;
function mkTbl(tdSz, n,id) {
 mT = n;
 td = "<td style = ' width:" + tdSz + "; height:" + tdSz + ";' class = 'field' ";
 invisbox = "<td style = 'width:" + tdSz + "; height:" +tdSz + "; border:1px; text-align:center'";
 tHdr = "<table" + " id = "+ id.toString()+" style = 'float:left; margin:100px;' cellpadding='0' cellspacing='0' border = '0' align = 'center' >";
 document.write(tHdr);
 for (i = 0; i < mT; i++) {
  document.write("<tr>");
  for (j = 0; j < mT; j++) {
	  if(i==0 || j==0){
		document.write(invisbox);
		if(j!=0){
			if(70+j+1 == 81)
				j++;
			document.write(" disabled >"+"&#10" + (70+j+1).toString() + "</td>");
		}
		else{
			if(i!=0)
			document.write(" disabled >" + i.toString() + "</td>");
			else
				document.write("></td>");
		}
	  }
	  else
       document.write(td + " data-i = '"+ i.toString() + "' data-j='" + j.toString() + "' ></td>");
  }
  document.write("</tr>");
 }
 document.write("</table>");
 tbl = document.getElementById("tbl");
}

