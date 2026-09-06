const body = document.body;
const modeButton = document.querySelector('.js-mode-button');
const modeIcon = modeButton.querySelector('.mode-icon');
const todasIcon = document.querySelectorAll('.todas-img');
const pendentesIcon = document.querySelectorAll('.pendentes-img');
const concluidasIcon = document.querySelectorAll('.concluidas-img');
const favoritasIcon = document.querySelectorAll('.favoritas-img');

const calendarioIcon = document.querySelectorAll('.calendar-img');

modeButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode') === true){
     modeIcon.src = 'images/moon.png';
     
     calendarioIcon.forEach((icon) =>{
      icon.src = 'images/calendarioDarkMode.png';
     })

    todasIcon.forEach((icon) => {
      icon.src = 'images/darkModeList.png';
    });

    pendentesIcon.forEach((icon) => {
      icon.src = 'images/darkModeCircle.png';
    });

    concluidasIcon.forEach((icon) => {
      icon.src = 'images/darkModeCheck.png';
    });

    favoritasIcon.forEach((icon) => {
      icon.src = 'images/darkModeStar.png';
    });

    }else{

      modeIcon.src = 'images/sun.png';
      

      calendarioIcon.forEach((icon) =>{
        icon.src = 'images/calendario.png';
      })
      
      todasIcon.forEach((icon) => {
        icon.src = 'images/list.png';
      });

      pendentesIcon.forEach((icon) => {
        icon.src = 'images/circle.png';
      });

      concluidasIcon.forEach((icon) => {
        icon.src = 'images/check.png';
      });

      favoritasIcon.forEach((icon) => {
        icon.src = 'images/star.png';
      });
  }
})