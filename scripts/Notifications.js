let content_notifications = document.getElementById("content_notifications"),
cantNotifications = document.getElementById("cantNotifications");
getPendingNotifications();

setInterval(() => {
  getPendingNotifications();
}, 600000)
async function getPendingNotifications() {
  let ajaxR = await pAjaxAsync(url_m_Notificaciones, {
    op: "getPendingNotifications"
  });
  if (!!ajaxR) {
    printNotifications(ajaxR.Data);
  }
}

const printNotifications = (data) => {
  let activeNotifications = content_notifications.querySelectorAll('.nav-item .nav-item-notification');
  let cantActiveNot = activeNotifications.length;
  let cantData = data.length;
  let contentHTML = "";
  if (cantData == 0) {
    contentHTML = `
    <li class="nav-item nav-item-none">
      <a class="dropdown-item">
        <span>
          <span>NOTIFICACIONES</span>
        </span>
        <span class="message">
          Sín registros
        </span>
      </a>
    </li>
    `;
    content_notifications.innerHTML = contentHTML;
    cantNotifications.innerHTML = 0;
    return false;
  }
  if (cantActiveNot > 0) {
    const arrNodes = Array.from(activeNotifications);
    let cantNew = 0;
    for (var i = 0; i < cantData; i++) {
      let exist = arrNodes.some(ele => ele.dataset.notification == `${data[i].Tipo}-${data[i].IdGeneral}-${data[i].IdPrincipal}`);
      if (!exist) {
        contentHTML += `
        <li data-notification="${data[i].Tipo}-${data[i].IdGeneral}-${data[i].IdPrincipal}" class="nav-item .nav-item-notification" onclick="viewNotification('${data[i].Tipo}', '${data[i].IdGeneral}', '${data[i].IdPrincipal}')">
          <a class="dropdown-item">
            <span class="image"><i class="${data[i].Tipo == 1 ? 'fas fa-money-bill-wave-alt' : 'fas fa-user-md'}"></i></span>
            <span>
              <span><b>${data[i].Titulo}</b></span>
            </span>
            <span class="message"><b>Fecha Movimiento:</b> ${data[i].FechaN}</span>
            <span class="message">
              ${data[i].Descripcion}
            </span>
          </a>
        </li>
        `;
        cantNew++;
      }
    }
    content_notifications.innerHTML = contentHTML + content_notifications.innerHTML;
    cantNotifications.innerHTML = cantActiveNot + cantNew;
  } else {
    for (var i = 0; i < cantData; i++) {
      contentHTML += `
      <li data-notification="${data[i].Tipo}-${data[i].IdGeneral}-${data[i].IdPrincipal}" class="nav-item" onclick="viewNotification('${data[i].Tipo}', '${data[i].IdGeneral}', '${data[i].IdPrincipal}')">
        <a class="dropdown-item">
          <span class="image"><i class="${data[i].Tipo == 1 ? 'fas fa-money-bill-wave-alt' : 'fas fa-user-md'}"></i></span>
          <span>
            <span><b>${data[i].Titulo}</b></span>
          </span>
          <span class="message"><b>Fecha Movimiento:</b> ${data[i].FechaN}</span>
          <span class="message">
            ${data[i].Descripcion}
          </span>
        </a>
      </li>
      `;
    }
    content_notifications.innerHTML = contentHTML;
    cantNotifications.innerHTML = cantData;
  }
  // toastr.info("Se han detectado notificaciones pendientes.");
}

const viewNotification = async (type, generalId, principalId) => {
  let resultUpd = await saveViewNotification(
    type, principalId
  );
  if (!resultUpd) {
    toastr.info("Ha ocurrido un problema al actualizar el estado de la notificación.");
    return false;
  }
  switch (Number(type)) {
    case 1:
      window.location.href = `Doctor.php?d=${btoa(generalId)}`;
      break;
    case 2:
      window.location.href = `OrdenTrabajo.php?OT=${btoa(principalId)}`;
      break;
    default:

  }
}

const saveViewNotification = async (type, principalId) => {
  let ajaxR = await pAjaxAsync(url_m_Notificaciones, {
    op: "saveViewNotification",
    principalId: principalId,
    type: type
  }, 1);
  if (!!ajaxR) {
    return true
  } {
    return false;
  }
}
