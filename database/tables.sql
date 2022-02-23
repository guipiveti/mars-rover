CREATE TABLE commands_log (
   user_id uuid NOT NULL,
   original_x int4 NOT NULL,
   original_y int4 NOT NULL,
   original_direction CHAR NOT NULL,
   command text NULL,
   "timestamp" timestamp NOT NULL,
   "valid" boolean NOT NULL,
   new_x int4 NOT NULL,
   new_y int4 NOT NULL,
   new_direction CHAR NOT NULL,
   CONSTRAINT transaction_pkey PRIMARY KEY (user_id, timestamp)
);