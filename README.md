# Reprenez et améliorez un projet existant

Dans le monde professionnel, on est souvent amené à reprendre un projet existant. Que faire quand vous vous retrouvez avec le code de quelqu'un d'autre ? Comment l'améliorer ? Voilà un savoir-faire qui vous sera très utile au quotidien !

En effet, faire un projet de bout en bout est "facile" : on connaît son fonctionnement sur le bout des doigts. En revanche, on se rend vite compte qu'il est plus dur de reprendre le travail de quelqu'un d'autre... surtout quand il n'a pas de tests !

Vous venez d'intégrer une petite équipe qui pense que tous les problèmes du monde viennent du fait que les gens ne sont pas assez organisés et qu'un peu de focus pourrait tout changer ! C'est pourquoi ils ont créé ce qu'ils appellent la meilleur application "to-do list" du monde. L'idée elle-même est très bien mais le code derrière n'est pas au top ! Ils vous ont sollicité pour ajouter des tests et régler quelques bugs dans le code.

Regardez comment il est structuré et essayez de comprendre comment il fonctionne. Votre mission sera de corriger des bugs, ajouter des tests, et optimiser sa performance.

## Etape 1 : Corrigez les bugs
Il y a deux bugs dans le code et c'est votre mission de les trouver ! Voici quelques indices:

Le premier est une faute de frappe.

	Controller.prototype.adddItem = function (title) {...};

	Controller.prototype.addItem = function (title) {...};

Le deuxième introduit un conflit éventuel entre deux IDs identiques.

	Store.prototype.save = function (updateData, callback, id) {
		var data = JSON.parse(localStorage[this._dbName]);
		var todos = data.todos;

		callback = callback || function () {};

		// Generate an ID
	    var newId = ""; 
	    var charset = "0123456789";

        for (var i = 0; i < 6; i++) {
     		newId += charset.charAt(Math.floor(Math.random() * charset.length));
		}

		// If an ID was actually given, find the item and update each property
		if (id) {
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].id === id) {
					for (var key in updateData) {
						todos[i][key] = updateData[key];
					}
					break;
				}
			}
			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, todos);
		} else {

    		// Assign an ID
			updateData.id = parseInt(newId);
			todos.push(updateData);
			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, [updateData]);
		}
	};


	Store.prototype.save = function (updateData, callback, id) {
		var data = JSON.parse(localStorage[this._dbName]);
		var todos = data.todos;

		callback = callback || function () {};

		// If an ID was actually given, find the item and update each property
		if (id) {
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].id === id) {
				  for (var key in updateData) {
					todos[i][key] = updateData[key];
				  }
				  break;
				}
		  	}
			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, todos);
		} else {

    		// Generate and Assign an ID
		updateData.id = parseInt(Date.now());
    
		todos.push(updateData);
		localStorage[this._dbName] = JSON.stringify(data);
		callback.call(this, [updateData]);
		}
	};

Vous allez chercher ces bugs dans le code, un peu comme dans "Où est Charlie". Une fois les bugs trouvés, corrigez-les ! Ils empêchent le code de marcher correctement (pour l'instant ce n'est même pas possible d'ajouter des tâches à la liste à cause de ces bugs).

Il y a également des améliorations à faire, même s'il ne s'agit pas de bugs proprement dit. Essayez de trouver où vous pouvez optimiser des boucles et vérifiez s'il y a des fonctions qui affichent des informations dans la console de déboggage  qui ne sont pas nécessaires.

## Etape 2 : où sont les tests ?!
Vous allez voir que ce projet a déjà quelques tests mais largement pas assez ! Pour le prendre en main, vous allez ajouter tous les tests unitaires et fonctionnels  pertinents que vous pouvez. L'objectif est de solidifier le projet. Ainsi, lorsque vous le modifierez par la suite, vous pourrez vous baser sur ces tests pour vérifier que vous ne "cassez" rien.

Cette étape peut paraître un peu longue et fastidieuse, mais elle est nécessaire pour gagner beaucoup de temps et éviter des surprises à l'avenir !

Il y a déjà un fichier existant pour les tests de ce projet :  ControllerSpec.js .  À l'intérieur de ce fichier, quelques tests à ajouter sont indiqués dans le code. Ils sont indiqués avec le commentaire suivant :

			// TODO: write test

Plus précisément, vous pouvez les trouver sur les lignes #62, #86, #90, #137, #141, #146, #150, #156, et #196 de  ControllerSpec.js .

		it('should show entries on start-up', function () {
		// TODO: write test
		// new todos list
		var todos = {};
		// update the model
		setUpModel([todos]);
		// update the view to default (all)
		subject.setView('');
		// set view with all todos
		expect(view.render).toHaveBeenCalledWith('showEntries', [todos]);
		});

		it('should show active entries', function () {
		// TODO: write test
		// new todos list
		var todos = {title: 'my todo', completed: false};
		// update the model
		setUpModel([todos]);
		// update the view to Active
		subject.setView('#/Active');
		// find active todo
		expect(model.read).toHaveBeenCalledWith({completed: false}, jasmine.any(Function));
		// set view with active todo
		expect(view.render).toHaveBeenCalledWith('showEntries', [todos]);
		});

		it('should show completed entries', function () {
		// TODO: write test
		// new todos list
		var todos = {title: 'my todo', completed: true};
		// update the model
		setUpModel([todos]);
		// update the view to Completed
		subject.setView('#/Completed');
		// find completed todo
		expect(model.read).toHaveBeenCalledWith({completed: true}, jasmine.any(Function));
		// set view with completed todo
		expect(view.render).toHaveBeenCalledWith('showEntries', [todos]);
		});

		it('should highlight "All" filter by default', function () {
		// TODO: write test
		// new todos list
		var todos = {};
		// update the model
		setUpModel([todos]);
		// update the view to default (all)
		subject.setView('');
		// set setFilter to default (all)
		expect(view.render).toHaveBeenCalledWith('setFilter', '');
		});

		it('should highlight "Active" filter when switching to active view', function () {
		// TODO: write test
		// new todos list
		var todos = {}
		// update the model
		setUpModel([todos]);
		// update the view to Active
		subject.setView('#/Active');
		// set setFilter to Active
		expect(view.render).toHaveBeenCalledWith('setFilter', 'Active');
		});

		it('should toggle all todos to completed', function () {
		// TODO: write test
		// new todos list
		var todos = [{id: 42, title: 'my todo', completed: false},
					{id: 43, title: 'new one', completed: false},
					{id: 44, title: 'again', completed: false}];
		// update the model
		setUpModel(todos);
		// update the view to default
		subject.setView('');
		// trigger togleAll button
		view.trigger('toggleAll', {completed: true});
		// update the model with all completed todo
		expect(model.update).toHaveBeenCalledWith(42, {completed: true}, jasmine.any(Function));
		expect(model.update).toHaveBeenCalledWith(43, {completed: true}, jasmine.any(Function));
		expect(model.update).toHaveBeenCalledWith(44, {completed: true}, jasmine.any(Function));
		});

		it('should update the view', function () {
		// new todos list
		var todos = [{id: 42, title: 'my todo', completed: false},
					{id: 43, title: 'new one', completed: false},
					{id: 44, title: 'again', completed: false}];
		// update the model
		setUpModel(todos);
		// update the view to default
		subject.setView('');
		// trigger togleAll button
		view.trigger('toggleAll', {completed: true});
		// update the view with all completed todo
		expect(view.render).toHaveBeenCalledWith('elementComplete', {id: 42, completed: true});
		expect(view.render).toHaveBeenCalledWith('elementComplete', {id: 43, completed: true});
		expect(view.render).toHaveBeenCalledWith('elementComplete', {id: 44, completed: true});
		});

		it('should add a new todo to the model', function () {
		// TODO: write test
		var todos = {};
		// update the model
		setUpModel([todos]);
		// update the view to default
		subject.setView('');
		// trigger newTodo
		view.trigger('newTodo', 'my new todo')
		expect(model.create).toHaveBeenCalledWith('my new todo', jasmine.any(Function));
		});

		it('should remove an entry from the model', function () {
		// TODO: write test
		var todos = {id: 42, title: 'my todo', completed: true};
		setUpModel([todos]);

		subject.setView('');
		view.trigger('itemRemove', {id: 42})
		expect(model.remove).toHaveBeenCalledWith(42, jasmine.any(Function));
		});

Vous pouvez aller plus loin et ajouter des tests supplémentaires si vous le voulez !

## Etape 3 : optimisez la performance
Votre équipe vous a demandé d'analyser la performance d'un site concurrent pour identifier ce qui marche bien et ce qui ne marche pas, au cas où vous décidez de "scaler" votre propre application. Voici le site du concurrent.

Utilisez la console de développement de votre navigateur pour analyser la performance du site. Faites attention aux ressources utilisées par les différents éléments du site (par exemple, ce qui est lent, ce qui est rapide, etc) et aux ressources utilisées par les publicités sur le site et celles utilisées pour effectuer les fonctionnalités "To-do" pour la liste elle-même.

Maintenant, vous allez faire un audit de performance. En vous appuyant sur les données, écrivez un document de 300 à 500 mots qui décrit la performance du site, comment il se distingue de votre application, et comment optimiser la performance en vue d'un éventuel "scaling" de votre application.

## Etape 4 : améliorez le projet
Maintenant que vous connaissez ce code par cœur, vous pouvez facilement ajouter des informations supplémentaires à votre documentation. Vous êtes désormais prêt à écrire de la documentation technique ! 

[Documentation technique](https://kamilmarque.github.io/todos/)

Pour le dire plus simplement, il faut documenter les éléments suivants :

		le projet lui-même (l'usage non technique)
		comment il fonctionne techniquement
		votre audit
