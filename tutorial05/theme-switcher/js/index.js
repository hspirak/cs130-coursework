const defaultTheme = () => {
   alert('switch to default theme');
   if(document.querySelector(".container"))
   {
     document.querySelector(".container").className = "default";
   }
   if(document.querySelector(".ocean"))
   {
     document.querySelector(".ocean").className = "default";
   }
   if(document.querySelector(".desert"))
   {
     document.querySelector(".desert").className = "default";
   }
};

const oceanTheme = () => {
  alert('switch to ocean theme');
  if(document.querySelector(".container"))
  {
    document.querySelector(".container").className = "ocean";
  }
   if(document.querySelector(".default"))
   {
     document.querySelector(".default").className = "ocean";
   }
   if(document.querySelector(".desert"))
   {
     document.querySelector(".desert").className = "ocean";
   }
};

const desertTheme = () => {
   alert('switch to desert theme');
   if(document.querySelector(".container"))
   {
     document.querySelector(".container").className = "desert";
   }
    if(document.querySelector(".default"))
    {
      document.querySelector(".default").className = "desert";
    }
    if(document.querySelector(".ocean"))
    {
      document.querySelector(".ocean").className = "desert";
    }
};


document.querySelector("#default").onclick = defaultTheme;
document.querySelector("#ocean").onclick = oceanTheme;
document.querySelector("#desert").onclick = desertTheme;
