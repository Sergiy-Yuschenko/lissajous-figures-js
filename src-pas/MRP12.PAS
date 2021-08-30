PROGRAM LISAGU;
uses graph,crt;
label 10;
const l=200;
var
a,b,v11,v12,v21,v22,g,t3:integer;
grdriver,grmode:integer;
{Y:integer;}
t,t1,t2,fi1,fi2,w1,w2,h,r:real;
function kx(a,b:integer;t,fi1,w1:real):integer;
begin
kx:=round(a/2+a/2*0.5*sin(w1*t+fi1));
end;
function ky(a,b:integer;t,fi2,w2:real):integer;
begin
ky:=round(b/2+a/2*0.50*sin(w2*t+pi+fi2));
end;
begin
10:clrscr;
writeln('введiть частоту коливань по осi XiY(межi (0-8))');
readln(w1,w2);
writeln('введiть зсув фаз по осi XiY(межi (0-4.281)) ');
readln(fi1,fi2);
r:=(l*w1)+(l*w2);
h:=(2*PI)/r;
t1:=0;
t2:=h;
t3:=0;
grdriver:=detect;
initgraph(grdriver,grmode,'');
if graphresult<>0 then begin
writeln('fu');
halt(3);
end;
randomize;
setcolor(random(15));
a:=getmaxX;
B:=getmaxY;
{Y:=random(15)}
repeat
v11:=kx(a,b,t1,fi1,w1);
v12:=ky(a,b,t1,fi2,w2);
v21:=kx(a,b,t2,fi1,w1);
v22:=ky(a,b,t2,fi2,w2);
{PUTpixel(v11,v12,Y);}
line(v11,v12,v21,v22);
t1:=t1+h;
t2:=t2+h;
t3:=t3+1;
until t3>r;
outtext('enter');
readln;
closegraph;
writeln('продовжити (0-так/0-нi');
readln(g);
if g=1 then goto 10
else
begin
clrscr;
writeln('допобачення');
delay(30000);
END;
end.

