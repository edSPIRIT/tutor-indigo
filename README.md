# Edx Themes

There are lots of themes out there to customize and use on opened but Overhang.io has a theme called indigo which is compatible with the tutor.

after you set your changes on the theme, follow the steps to use your customized theme on edx. 

### Render the theme:

`tutor config render --extra-config ./indigo/config.yml ./indigo/theme "$(tutor config printroot)/env/build/openedx/themes/indigo"`

### Rebuild, Tag and push the OpenEdx docker image:

`tutor images build openedx`
`docker tag ecd6072f8a4f avidcloud/openedx-ar-indigo:1`
`docker image push avidcloud/openedx-ar-indigo:1`

### Restart your platform and set the theme:
there are two cases here; local and k8s. if you are on local deployment: 

`tutor local stop`
`tutor local start -d`

`tutor local settheme indigo $(tutor config printvalue LMS_HOST) $(tutor config printvalue CMS_HOST)`

and if you are on a Kubernetes cluster:

`tutor k8s stop`
`tutor k8s quickstart`

you can use the reboot option also, but I prefer to stop and quickstart.

`tutor k8s settheme indigo $(tutor config printvalue LMS_HOST) $(tutor config printvalue CMS_HOST)`
