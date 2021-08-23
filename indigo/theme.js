function footerHandler() {
  $.get("/avid_admin_console/api/instance_config/", function (data) {
    if ($.isEmptyObject(data.results[0])) {
      return;
    }
    let result = data.results[0];
    $("nav[class='nav-colophon']").html(`
          <ol>
              
              <li>
                <a href="${result.footer_nav_about}">About</a>
              </li>
              
              <li>
                <a href="${result.footer_nav_contact}">Contact</a>
              </li>
              
          </ol>
        `);
    $("nav[class='nav-legal']").html(`
          <ul>
              
              <li>
                <a href="${result.footer_legal_tos}">Terms of service</a>
              </li>
                            
          </ul>
        `);
  });
  return;
}

function imageHandler() {
  $.get("/avid_admin_console/api/instance_config/", function (data) {
    if ($.isEmptyObject(data.results[0])) {
      return;
    }
    let result = data.results[0];
    if (result.logo !== null) {
      $("img[class='logo']").attr("src", result.logo);
    }
    if (result.favicon !== null) {
      $("link[rel*='icon']").attr("href", result.favicon);
    }
  });
  return;
}

function customPageHandler() {
  $.get("/avid_admin_console/api/custom_pages/", function (data) {
    if ($.isEmptyObject(data.results[0])) {
      return;
    }
    let result = data.results[0];
    let pathname = window.location.pathname;
    let paths = ["/about", "/contact", "/tos", "/privacy", "/donate", "/honor"];

    // all custom pages have the same section
    // the keys of the json correspond to pathname
    if (paths.includes(pathname)) {
      let path_key = pathname.slice(1) + "_page";
      $("section[class='container about']").html(result[path_key]);
    }
  });

  return;
}

function orgNameWelcomeHandler() {
  $.get("/avid_admin_console/api/instance_config/", function (data) {
    if ($.isEmptyObject(data.results[0])) {
      return;
    }
    let result = data.results[0];
    // set org name and welcome message in front page of lms
    $("div[class='title'] div[class='heading-group']").html(`
                <h1>${result.platform_name}</h1>
                <p>${result.welcome_message}</p>
            `);
    // set title
    let title = $("title").html();
    let title_array = $("title").html().trim().split("|");
    if (title_array.length > 1) {
      title_array[1] = result.platform_name;
      title = title_array.join("| ");
      $("title").html(title);
    } else {
      $("title").html(result.platform_name);
    }
  });
  return;
}

function enableLoader(callback) {
  $(".window-wrap").hide();
  callback();
  return;
}

function disableLoader() {
  $(".loader").hide();
  $(".loader-bg").hide();
  $(".loader-inner").hide();
  $(".window-wrap").show();
}

$(document).on("ready", function () {
  enableLoader(function () {
    footerHandler();
    imageHandler();
    customPageHandler();
    orgNameWelcomeHandler();
  });
});

$(window).load(function () {
  disableLoader();
});
