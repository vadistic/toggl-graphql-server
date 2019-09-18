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
  DateTime: string,
};

export type BlogPost = {
   __typename?: 'BlogPost',
  title: Scalars['String'],
  url: Scalars['String'],
  category: Scalars['String'],
  pub_date: Scalars['DateTime'],
};


export type DetailedUser = {
   __typename?: 'DetailedUser',
  id: Scalars['ID'],
  default_wid: Scalars['ID'],
  email: Scalars['String'],
  fullname: Scalars['String'],
  jquery_timeofday_format: Scalars['String'],
  jquery_date_format: Scalars['String'],
  timeofday_format: Scalars['String'],
  date_format: Scalars['String'],
  store_start_and_stop_time: Scalars['Boolean'],
  beginning_of_week: Scalars['Int'],
  sidebar_piechart: Scalars['Boolean'],
  timeline_experiment: Scalars['Boolean'],
  workspaces: Array<Maybe<Workspace>>,
  language: Scalars['String'],
  image_url?: Maybe<Scalars['String']>,
  at: Scalars['DateTime'],
  created_at: Scalars['DateTime'],
  new_blog_post?: Maybe<BlogPost>,
  send_product_emails: Scalars['Boolean'],
  send_weekly_report: Scalars['Boolean'],
  send_timer_notifications: Scalars['Boolean'],
  openid_email?: Maybe<Scalars['String']>,
  openid_enabled: Scalars['Boolean'],
  timezone: Scalars['String'],
  retention?: Maybe<Scalars['Int']>,
  record_timeline?: Maybe<Scalars['Boolean']>,
  render_timeline?: Maybe<Scalars['Boolean']>,
  timeline_enabled?: Maybe<Scalars['Boolean']>,
  should_upgrade?: Maybe<Scalars['Boolean']>,
  achievements_enabled?: Maybe<Scalars['Boolean']>,
  last_blog_entry?: Maybe<Scalars['String']>,
  duration_format?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createProject: Project,
  updateProject: Project,
  deleteProject: Array<Scalars['ID']>,
  createTag: Tag,
  updateTag: Tag,
  deleteTag: Array<Scalars['ID']>,
  createUser: User,
  updateUser: User,
  resetToken: Scalars['String'],
  updateWorkspace: Workspace,
};


export type MutationCreateProjectArgs = {
  data: ProjectCreateInput
};


export type MutationUpdateProjectArgs = {
  where: UniqueIdInput,
  data: ProjectUpdateInput
};


export type MutationDeleteProjectArgs = {
  where: UniqueIdInput
};


export type MutationCreateTagArgs = {
  data: TagCreateInput
};


export type MutationUpdateTagArgs = {
  where: UniqueIdInput,
  data: TagUpdateInput
};


export type MutationDeleteTagArgs = {
  where: UniqueIdInput
};


export type MutationCreateUserArgs = {
  data: UserCreateInput
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput
};


export type MutationUpdateWorkspaceArgs = {
  where: UniqueIdInput,
  data: WorkspaceUpdateInput
};

export type Obm = {
   __typename?: 'Obm',
  included: Scalars['Boolean'],
  nr: Scalars['Int'],
  actions: Scalars['String'],
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
  user: DetailedUser,
  workspace?: Maybe<Workspace>,
  workspaces: Array<Workspace>,
};


export type QueryProjectArgs = {
  where: UniqueIdInput
};


export type QueryWorkspaceArgs = {
  where: UniqueIdInput
};

export type Tag = {
   __typename?: 'Tag',
  /** Unique ID of the tag (integer, required) */
  id: Scalars['ID'],
  /** The name of the tag (string, required, unique in workspace) */
  name: Scalars['String'],
  /** workspace ID, where the tag will be used (integer, required) */
  wid: Scalars['ID'],
};

export type TagCreateInput = {
  name: Scalars['String'],
  wid: Scalars['ID'],
};

export type TagUpdateInput = {
  name: Scalars['String'],
};

export type UniqueIdInput = {
  id: Scalars['ID'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  default_wid: Scalars['ID'],
  email: Scalars['String'],
  fullname: Scalars['String'],
  jquery_timeofday_format: Scalars['String'],
  jquery_date_format: Scalars['String'],
  timeofday_format: Scalars['String'],
  date_format: Scalars['String'],
  store_start_and_stop_time: Scalars['Boolean'],
  beginning_of_week: Scalars['Int'],
  sidebar_piechart: Scalars['Boolean'],
  timeline_experiment: Scalars['Boolean'],
};

export type UserCreateInput = {
  email: Scalars['String'],
  password: Scalars['String'],
  timezone: Scalars['String'],
  created_with: Scalars['String'],
};

export type UserUpdateInput = {
  fullname?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  send_product_emails?: Maybe<Scalars['Boolean']>,
  send_weekly_report?: Maybe<Scalars['Boolean']>,
  send_timer_notifications?: Maybe<Scalars['Boolean']>,
  store_start_and_stop_time?: Maybe<Scalars['Boolean']>,
  beginning_of_week?: Maybe<Scalars['Int']>,
  timezone?: Maybe<Scalars['String']>,
  timeofday_format?: Maybe<Scalars['String']>,
  date_format?: Maybe<Scalars['String']>,
};

export type Workspace = {
   __typename?: 'Workspace',
  id: Scalars['ID'],
  name: Scalars['String'],
  logo_url?: Maybe<Scalars['String']>,
  profile?: Maybe<Scalars['Int']>,
  premium: Scalars['Boolean'],
  admin: Scalars['Boolean'],
  default_hourly_rate?: Maybe<Scalars['Float']>,
  default_currency?: Maybe<Scalars['String']>,
  only_admins_may_create_projects: Scalars['Boolean'],
  only_admins_see_billable_rates: Scalars['Boolean'],
  only_admins_see_team_dashboard: Scalars['Boolean'],
  projects_billable_by_default: Scalars['Boolean'],
  rounding: Scalars['Int'],
  rounding_minutes: Scalars['Int'],
  api_token: Scalars['String'],
  at: Scalars['DateTime'],
  ical_enabled: Scalars['Boolean'],
};

export type WorkspaceUpdateInput = {
  name: Scalars['String'],
  logo_url?: Maybe<Scalars['String']>,
  profile?: Maybe<Scalars['Int']>,
  premium: Scalars['Boolean'],
  admin: Scalars['Boolean'],
  default_hourly_rate?: Maybe<Scalars['Float']>,
  default_currency?: Maybe<Scalars['String']>,
  only_admins_may_create_projects: Scalars['Boolean'],
  only_admins_see_billable_rates: Scalars['Boolean'],
  only_admins_see_team_dashboard: Scalars['Boolean'],
  projects_billable_by_default: Scalars['Boolean'],
  rounding: Scalars['Int'],
  rounding_minutes: Scalars['Int'],
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
  UniqueIdInput: UniqueIdInput,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Project: ResolverTypeWrapper<Project>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  DetailedUser: ResolverTypeWrapper<DetailedUser>,
  Workspace: ResolverTypeWrapper<Workspace>,
  BlogPost: ResolverTypeWrapper<BlogPost>,
  Mutation: ResolverTypeWrapper<{}>,
  ProjectCreateInput: ProjectCreateInput,
  ProjectUpdateInput: ProjectUpdateInput,
  TagCreateInput: TagCreateInput,
  Tag: ResolverTypeWrapper<Tag>,
  TagUpdateInput: TagUpdateInput,
  UserCreateInput: UserCreateInput,
  User: ResolverTypeWrapper<User>,
  UserUpdateInput: UserUpdateInput,
  WorkspaceUpdateInput: WorkspaceUpdateInput,
  Obm: ResolverTypeWrapper<Obm>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  UniqueIdInput: UniqueIdInput,
  ID: Scalars['ID'],
  Project: Project,
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Int: Scalars['Int'],
  Float: Scalars['Float'],
  DateTime: Scalars['DateTime'],
  DetailedUser: DetailedUser,
  Workspace: Workspace,
  BlogPost: BlogPost,
  Mutation: {},
  ProjectCreateInput: ProjectCreateInput,
  ProjectUpdateInput: ProjectUpdateInput,
  TagCreateInput: TagCreateInput,
  Tag: Tag,
  TagUpdateInput: TagUpdateInput,
  UserCreateInput: UserCreateInput,
  User: User,
  UserUpdateInput: UserUpdateInput,
  WorkspaceUpdateInput: WorkspaceUpdateInput,
  Obm: Obm,
};

export type BlogPostResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlogPost'] = ResolversParentTypes['BlogPost']> = {
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  pub_date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type DetailedUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['DetailedUser'] = ResolversParentTypes['DetailedUser']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  default_wid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  fullname?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  jquery_timeofday_format?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  jquery_date_format?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  timeofday_format?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  date_format?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  store_start_and_stop_time?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  beginning_of_week?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  sidebar_piechart?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  timeline_experiment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  workspaces?: Resolver<Array<Maybe<ResolversTypes['Workspace']>>, ParentType, ContextType>,
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  image_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  new_blog_post?: Resolver<Maybe<ResolversTypes['BlogPost']>, ParentType, ContextType>,
  send_product_emails?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  send_weekly_report?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  send_timer_notifications?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  openid_email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  openid_enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  timezone?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  retention?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  record_timeline?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  render_timeline?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  timeline_enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  should_upgrade?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  achievements_enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  last_blog_entry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  duration_format?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'data'>>,
  updateProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'where' | 'data'>>,
  deleteProject?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'where'>>,
  createTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationCreateTagArgs, 'data'>>,
  updateTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationUpdateTagArgs, 'where' | 'data'>>,
  deleteTag?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteTagArgs, 'where'>>,
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>,
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data'>>,
  resetToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updateWorkspace?: Resolver<ResolversTypes['Workspace'], ParentType, ContextType, RequireFields<MutationUpdateWorkspaceArgs, 'where' | 'data'>>,
};

export type ObmResolvers<ContextType = any, ParentType extends ResolversParentTypes['Obm'] = ResolversParentTypes['Obm']> = {
  included?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  nr?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  actions?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
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
  user?: Resolver<ResolversTypes['DetailedUser'], ParentType, ContextType>,
  workspace?: Resolver<Maybe<ResolversTypes['Workspace']>, ParentType, ContextType, RequireFields<QueryWorkspaceArgs, 'where'>>,
  workspaces?: Resolver<Array<ResolversTypes['Workspace']>, ParentType, ContextType>,
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  wid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  default_wid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  fullname?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  jquery_timeofday_format?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  jquery_date_format?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  timeofday_format?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  date_format?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  store_start_and_stop_time?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  beginning_of_week?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  sidebar_piechart?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  timeline_experiment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type WorkspaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Workspace'] = ResolversParentTypes['Workspace']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  logo_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  profile?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  premium?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  admin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  default_hourly_rate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  default_currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  only_admins_may_create_projects?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  only_admins_see_billable_rates?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  only_admins_see_team_dashboard?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  projects_billable_by_default?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  rounding?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  rounding_minutes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  api_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  ical_enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  BlogPost?: BlogPostResolvers<ContextType>,
  DateTime?: GraphQLScalarType,
  DetailedUser?: DetailedUserResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Obm?: ObmResolvers<ContextType>,
  Project?: ProjectResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Tag?: TagResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  Workspace?: WorkspaceResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
import gql from 'graphql-tag';
