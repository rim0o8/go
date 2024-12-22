FROM golang:1.22.3

RUN mkdir -p /home/webapp
WORKDIR /home/webapp

COPY go.mod /home/webapp/go.mod
COPY go.sum /home/webapp/go.sum
RUN go mod download

RUN go install github.com/air-verse/air@latest
CMD ["air"]