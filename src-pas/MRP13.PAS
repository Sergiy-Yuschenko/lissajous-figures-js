PROGRAM figures_Lisadzu;
uses graph,crt;
label 10,20,30;
const l=200;
var
  a,b,v11,v12,v21,v22,g,t3,i_,t_,k:integer;
  grdriver,grmode:integer;
  {Y:integer;}
  t,t1,t2,fi1,fi2,w1,w2,h,r:real;
  ll:char;
function kx(a,b:integer;t,fi1,w1:real):integer;
  begin
    kx:=round(a/2+a/2*0.7*cos(w1*t+fi1));
  end;
function ky(a,b:integer;t,fi2,w2:real):integer;
  begin
    ky:=round(b/2+a/2*0.7*cos(w2*t+fi2));
  end;
begin
  DirectVideo:=False;
  writeln('input delay (0-90000])');
  readln(t_);
  grdriver:=detect;
  initgraph(grdriver,grmode,'');
  if graphresult<>0 then begin
    writeln('fu');
    halt(3);
  end;
  randomize;
  a:=getmaxX;
  b:=getmaxY;
  10:k:=random(3);
  setcolor(15);
  outtext('figures Lisadzu');
  if k=0 then begin
    w1:=1+random(14);
    w2:=1+random(14);
  end;
  if k=1 then begin
    w1:=1+random(49);
    w2:=1+random(49);
  end;
  if k=2 then begin
    w1:=1+random(49);
    w2:=1+random(14);
  end;
  if k=3 then begin
    w1:=1+random(14);
    w2:=1+random(49);
  end;
  k:=random(3);
  if k=0 then begin
    fi1:=random(4)*0.785;
    fi2:=random(4)*0.785;
  end;
  if k=1 then begin
    fi1:=random(6280)/1000;
    fi2:=random(6280)/1000;
  end;
  if k=2 then begin
    fi1:=random(6280)/1000;
    fi2:=random(4)*0.785;
  end;
  if k=3 then begin
    fi1:=random(4)*0.785;
    fi2:=random(6280)/1000;
  end;
  k:=50;
  repeat
    t1:=w1/k;
    t2:=w2/k;
    h:=round(t1)/t1;
    r:=round(t2)/t2;
    if (h=1) and (r=1) then begin
      w1:=t1;
      w2:=t2;
    end;
    k:=k-1;
  until k<2;
  r:=(l*w1)+(l*w2);
  h:=(2*PI)/r;
  30:t1:=0;
  t2:=h;
  t3:=0;
  i_:=1+random(14);
  setcolor(i_);
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
    delay(t_);
    if keypressed then goto 20;
  until t3>r;
  delay(1000);
  ClearDevice;
  goto 10;
    20:setcolor(15);
    ClearDevice;
    outtext('figures Lisadzu');
    setcolor(15);
    outtext('          Quit (Y/N)');
    readkey;
    ll:=readkey;
    if Ord(ll)<>121 then begin
      ClearDevice;
      outtext('figures Lisadzu');
      goto 30;
    end else
      delay(30);
      closegraph;
end.

  {made in XT-15}
  {Yustshenko}