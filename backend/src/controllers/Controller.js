class Controller {

    constructor(model) {
        this.model = model;
        this.index = this.index.bind(this);
        this.delete = this.delete.bind(this);
    }

    async index(req,res) {

        try {

            const { page=1 } = req.query;

            const limit = 8;

            const offset = (page-1)*limit;

            const order = [['createdAt','DESC']];

            const docs = await this.model.findAndCountAll({limit,offset,order});

            const count = docs.count;

            res.header('X-Total-Count',count);

            if(count===0) {
                return res.status(204).json({ message:'no registered documents' });
            }

            return res.json(docs.rows);

        } catch(err) {
            console.log(err);
            return res.status(500).json({ message: 'there was a problem with the server' });

        }

    }

    async delete(req,res) {

        try {

            const docId = req.params.id;

            const doc = await this.model.findByPk(docId);

            if(!doc) {

                return res.status(404).json({ message:'document not found' });
            
            }

            await doc.destroy();

            return res.status(204).send();

        } catch(err) {

            return res.status(500).json({ message: 'there was a problem with the server' });

        }        

    }

}

module.exports = Controller;