class AbstractCreepypasta {
	constructor( title, content ) {
		console.log( this.constructor.name )
		this._title = title
		this._content = content
	}
	
	get title( ) {
		return this._name
	}
	
	get content( ) {
		return this._content
	}
}
class Creepypasta extends AbstractCreepypasta {
	
}



class AbstractCreepypastaFactory {
	constructor( ) {
		console.log( this.constructor.name )
	}
	
	create( text ) {
		return new Creepypasta( text )
	}
}
class CreepypastaFactory extends AbstractCreepypastaFactory {
	
}



class CreepypastaSummaryAbstact extends Array {
	get generator( ) {
		const gen = function*( summary, i ) {
			yield summary[ i++ ]
		}
		
		return gen( this, 0 )
	}
}
class CreepypastaSummary extends CreepypastaSummaryAbstact {
	
}



class AbstractRoute {
	get filepaths( ) {
		return this._filepaths
	}
	
	get filetypes( ) {
		return this._filetypes
	}
	
	constructor( filepaths, filetypes ) {
		console.log( this.constructor.name )
		this._filepaths = filepaths
		this._filetypes = filetypes
	}
	
	getUrls( filename ) {
		return this.filetypes.map( type => `${this.filepaths.join( '/' )}/${filename}.${type}` )
	}
}
class Route extends AbstractRoute {
	
}



class AbstractFileRequester {
	get path( ) {
		return this._path
	}
	
	set path( newRoute ) {
		this._path = newRoute
	}
	
	constructor( path ) {
		console.log( this.constructor.name )
		this._path = path
	}
	
	download( file ) {
		const fileUrls = this.path.getUrls( file )
		const reqs = fileUrls.map( url => fetch( url ) )
		
		return Promise.any( reqs )
	}
}
class FileRequester extends AbstractFileRequester {
	
}





const Router = {
	ARCH: new Route( [ 'itens', 'arch' ], [ 'txt', 'md' ] ),
	CSS: new Route( [ 'itens', 'css' ], [ 'css' ] ),
	CSSModule: new Route( [ 'itens', 'css', 'modules' ], [ 'css' ] ),
	IMG: new Route( [ 'itens', 'img' ], [ 'jpg', 'png' ] ),
	JS: new Route( [ 'itens', 'js' ], [ 'js' ] ),
	JSModule: new Route( [ 'itens', 'js', 'modules' ], [ 'js', 'mjs' ] ),
	JSON: new Route( [ 'itens', 'json' ], [ 'json' ] ),
	Page: new Route( [  ], [ 'html', 'htm' ] ),
	TXT: new Route( [ 'itens', 'arch' ], [ 'txt' ] ),
	MD: new Route( [ 'itens', 'arch' ], [ 'md' ] ),
}

class AbstractAlpha {
	get path( ) {
		return this._path
	}
	
	get requester( ) {
		return new FileRequester( this.path )
	}
	
	constructor( path ) {
		console.log( this.constructor.name )
		this._path = path
	}
	
	async getOne( filename, cb ) {
		const re = await this.requester.download( filename )
		const ab = await cb( re )
		
		return ab
	}
	
	async getSome( filenameList, callback ) {
		const files = filenameList.map( async ( filename ) => await this.getOne( filename, await callback ) )
		return Promise.all( files )
	}
	
	async getAny( filenameList, callback ) {
		const files = filenameList.map( async ( filename ) => await this.getOne( filename, await callback ) )
		return Promise.any( files )
	}
}
class Alpha extends AbstractAlpha {
	
}



const summGetter = new Alpha( Router.JSON )
const summary = await summGetter.getOne( 'creepypastas', async ( resp ) => await resp.json( ) )
console.log( summary )


const creepsGetter = new Alpha( Router.TXT )
const slugList = summary.map( i => i.slug )
const creepas = await creepsGetter.getSome( slugList, async ( resp ) => await resp.text( ) )
//console.log( creepas )



const alpha = ( parent, text ) => {
	const _parent = betta( parent )
	const _paragraphs = gamma( text )
	
	_paragraphs.map( par => {
		const _p = document.createElement( 'p' )
		_p.innerText = par
		_parent.append( _p )
	} )
	
	return _parent
}

const betta = ( parent ) => {
	if( parent.constructor.name === 'String' ) {
		parent = document.createElement( parent )
	}
	
	return parent
}

const gamma = ( text ) => {
	if( text.constructor.name === 'Array' ) {
		text = text.flatMap( paragraph => paragraph ).join( '' )
	}
	
	try {
		return text.split( '\n' )
	} catch( e ) {
		return [ 'error', e ]
	}
}

const article = alpha( 'article', creepas )
document.body.append( article )











