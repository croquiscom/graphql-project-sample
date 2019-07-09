#!/bin/bash
mysql -psample < /docker-entrypoint-initdb.d/1-grant.sql
