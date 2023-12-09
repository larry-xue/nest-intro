# record

- 2023-12-03
  - learned
    - how to write http request handler in nestjs with its handler
    - do all of this in cloud based enviroment
    - learn how to use insomnia to manage and send request to my application
  - endpoint
    - https://www.bilibili.com/video/BV1T44y1W7Si?p=14&spm_id_from=pageDriver&vd_source=2b59bb054930c5032f5c7244f60c23a3
- 2023-12-04
  - learned
    - write coffees service with entity
    - what is module in nestjs
    - class-validation class=transformer
    - PartialTypes from @nestjs/mapped-types
    - VakudationPipe
      - whitelist
      - transform, automatically transform params and body to DTO
    - use typeorm to connect database
    - use online free elephantSQL
      - https://api.elephantsql.com/console/16286841-eacb-4fdc-9329-2010336c60d0/stats?
  - endpoint
    - https://www.bilibili.com/video/BV1T44y1W7Si?p=26&spm_id_from=pageDriver&vd_source=2b59bb054930c5032f5c7244f60c23a3
- 2023-12-05
  - learned
    - use typeorm to write crud api
    - create Many to Many relationship using typeorm
    - endpoint
      - https://www.bilibili.com/video/BV1T44y1W7Si?p=29&spm_id_from=pageDriver&vd_source=2b59bb054930c5032f5c7244f60c23a3
- 2023-12-06
  - learned
    - fixed typeorm error, cause I wrote a wrong relation between two entities.
    - typeorm transaction
    - database migration
  - endpoint
    - https://www.bilibili.com/video/BV1T44y1W7Si?p=33&vd_source=2b59bb054930c5032f5c7244f60c23a3
- 2023-12-09
  - module is like a box, that contains all the information that nest Ioc need
    - controller: define the controller for this module
    - provider: define the service that the controller need, nest will automatically return its instance
    - imports: the other *module* that this module is rely on
    - exports: the api that this module support
  - we cannot import controller or service directly, the only way is to import module, and use the exports of that module
  - nonclassbased provider token
