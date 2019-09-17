import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
};


export type Mutation = {
   __typename?: 'Mutation',
  createProject: Project,
  updateProject: Project,
  deleteProject: Array<Scalars['ID']>,
};


export type MutationCreateProjectArgs = {
  data: ProjectCreateInput
};


export type MutationUpdateProjectArgs = {
  where: WhereUniqueId,
  data: ProjectUpdateInput
};


export type MutationDeleteProjectArgs = {
  where: WhereUniqueId
};

export type Project = {
   __typename?: 'Project',
  /** the name of the project (string, required, unique for client and workspace) */
  name: Scalars['String'],
  /** workspace ID, where the project will be saved (integer, required) */
  wid: Scalars['ID'],
  /** client ID (integer, not required) */
  cid?: Maybe<Scalars['ID']>,
  /** whether the project is archived or not (boolean, by default true) */
  active: Scalars['Boolean'],
  /** whether project is accessible for only project users or for all workspace users (boolean, default true) */
  is_private: Scalars['Boolean'],
  /** whether the project can be used as a template (boolean, not required) */
  template?: Maybe<Scalars['Boolean']>,
  /** id of the template project used on current project's creation */
  template_id?: Maybe<Scalars['ID']>,
  /** whether the project is billable or not (boolean, default true, available only for pro workspaces) */
  billable?: Maybe<Scalars['Boolean']>,
  /** 
 * whether the estimated hours are automatically calculated based on task
   * estimations or manually fixed based on the value of 'estimated_hours'
   * (boolean, default false, not required, premium functionality)
 **/
  auto_estimates?: Maybe<Scalars['Boolean']>,
  /** 
 * if auto_estimates is true then the sum of task estimations is returned,
   * otherwise user inserted hours (integer, not required, premium functionality)
 **/
  estimated_hours?: Maybe<Scalars['Int']>,
  /** id of the color selected for the project */
  color?: Maybe<Scalars['Int']>,
  /** hex of project's color */
  hex_color?: Maybe<Scalars['String']>,
  /** hourly rate of the project (float, not required, premium functionality) */
  rate?: Maybe<Scalars['Float']>,
  /** timestamp indicating when the project was last updated (UTC time), read-only */
  at: Scalars['DateTime'],
};

export type ProjectCreateInput = {
  name: Scalars['String'],
  wid: Scalars['ID'],
  cid?: Maybe<Scalars['ID']>,
  template_id?: Maybe<Scalars['ID']>,
  is_private?: Maybe<Scalars['Boolean']>,
};

export type ProjectUpdateInput = {
  name?: Maybe<Scalars['String']>,
  cid?: Maybe<Scalars['ID']>,
  is_private?: Maybe<Scalars['Boolean']>,
  color?: Maybe<Scalars['Int']>,
};

export type Query = {
   __typename?: 'Query',
  project?: Maybe<Project>,
};


export type QueryProjectArgs = {
  where: WhereUniqueId
};

export type WhereUniqueId = {
  id: Scalars['ID'],
};


export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  WhereUniqueId: WhereUniqueId,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Project: ResolverTypeWrapper<Project>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  Mutation: ResolverTypeWrapper<{}>,
  ProjectCreateInput: ProjectCreateInput,
  ProjectUpdateInput: ProjectUpdateInput,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  WhereUniqueId: WhereUniqueId,
  ID: Scalars['ID'],
  Project: Project,
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Int: Scalars['Int'],
  Float: Scalars['Float'],
  DateTime: Scalars['DateTime'],
  Mutation: {},
  ProjectCreateInput: ProjectCreateInput,
  ProjectUpdateInput: ProjectUpdateInput,
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'data'>>,
  updateProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'where' | 'data'>>,
  deleteProject?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'where'>>,
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  wid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  cid?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  is_private?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  template?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  template_id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  billable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  auto_estimates?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  estimated_hours?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  color?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  hex_color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  rate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectArgs, 'where'>>,
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Project?: ProjectResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
import gql from 'graphql-tag';
