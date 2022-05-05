export PGUSER=arnaud
export PGDATABASE=collectio


# sqitch init collectio-scripts --engine pg
# sqitch add createdb -n "db creation"
# sqitch add createuser -n "user table creation"
sqitch add createallothertables -n "all other tables creation"

# je revert
 # sqitch revert db:pg:collectio
# je deploy
 #sqitch deploy db:pg:collectio
# je verify
 # sqitch verify db:pg:collectio