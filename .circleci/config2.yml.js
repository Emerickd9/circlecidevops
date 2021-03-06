
version: 2.1
commands:
  print_pipeline_id:
    description: "This prints the Pipeline ID"
    steps:
      - run: echo ${CIRCLE_WORKFLOW_ID}


jobs:
  save_hello_world_output:
    docker:
      - image: circleci/node:13.8.0
    steps:
      - run: echo "hello world" > ~/output.txt
      - persist_to_workspace:
          root: ~/
          paths:
            - output.txt

  print_output_file:
    docker:
      - image: circleci/node:13.8.0
    steps:
      - attach_workspace:
          at: ~/
      - run: cat ~/output.txt

  show_pipeline_ID:
    docker:
      - image: circleci/node:13.8.0
    steps:
      - print_pipeline_id

workflows:
  my_workflow:
    jobs:
      - save_hello_world_output
      - show_pipeline_ID
      - print_output_file:
          requires:
            - save_hello_world_output