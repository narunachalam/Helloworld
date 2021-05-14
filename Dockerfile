FROM narunachalam/Helloworld:1.0.0

LABEL maintainer="Nirai Arunachalam <balu.nirai@gmail.com>"
LABEL repository="https://github.com/narunachalam/Helloworld"
LABEL homepage="https://github.com/narunachalam/Helloworld"

LABEL com.github.actions.name="Get PR Commits Action"
LABEL com.github.actions.description="Get PR Commits"

COPY LICENSE README.md /

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
