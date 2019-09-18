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

export type Client = {
   __typename?: 'Client',
  id: Scalars['ID'],
  /** the name of the client */
  name: Scalars['String'],
  /** workspace ID, where the client will be used */
  wid: Scalars['ID'],
  /** notes for the client */
  notes?: Maybe<Scalars['String']>,
  /** indicates the time client was last updated (UTC time) */
  at: Scalars['DateTime'],
  /** active: possible values true/false/both. By default true. If false, only archived projects are returned */
  projects: Array<Project>,
};


export type ClientProjectsArgs = {
  active?: Maybe<Scalars['String']>
};

export type ClientCreateInput = {
  name: Scalars['String'],
  wid: Scalars['ID'],
  notes?: Maybe<Scalars['String']>,
};

/** workspace id can't be changed! */
export type ClientUpdateInput = {
  name: Scalars['String'],
  notes?: Maybe<Scalars['String']>,
};


/** detailed user data */
export type DetailedUser = {
   __typename?: 'DetailedUser',
  id: Scalars['ID'],
  /** default workspace id */
  default_wid: Scalars['ID'],
  /** user's email */
  email: Scalars['String'],
  /** user's full name */
  fullname: Scalars['String'],
  /** eg. 'h:i A' */
  jquery_timeofday_format: Scalars['String'],
  /** eg. 'h:i A' */
  jquery_date_format: Scalars['String'],
  /** eg. 'h:mm A' */
  timeofday_format: Scalars['String'],
  /** eg. MM/DD/YYYY */
  date_format: Scalars['String'],
  /** whether start and stop time are saved on time entry */
  store_start_and_stop_time: Scalars['Boolean'],
  /** integer 0-6 (Sunday=0) */
  beginning_of_week: Scalars['Int'],
  /** should a piechart be shown on the sidebar */
  sidebar_piechart: Scalars['Boolean'],
  /** ??? */
  timeline_experiment: Scalars['Boolean'],
  workspaces: Array<Maybe<Workspace>>,
  /** user's language */
  language: Scalars['String'],
  /** url with the user's profile picture */
  image_url?: Maybe<Scalars['String']>,
  /** timestamp of last changes */
  at: Scalars['DateTime'],
  /** account create date */
  created_at: Scalars['DateTime'],
  /** an object with toggl blog post title and link */
  new_blog_post?: Maybe<BlogPost>,
  /** toggl can send newsletters over e-mail to the user */
  send_product_emails: Scalars['Boolean'],
  /** if user receives weekly report */
  send_weekly_report: Scalars['Boolean'],
  /** email user about long-running (more than 8 hours) tasks */
  send_timer_notifications: Scalars['Boolean'],
  /** ??? */
  openid_email?: Maybe<Scalars['String']>,
  /** openid_enabled: (boolean) google signin enabled */
  openid_enabled: Scalars['Boolean'],
  /** timezone user has set on the 'My profile' page (IANA TZ timezones) */
  timezone: Scalars['String'],
  /** ??? */
  retention?: Maybe<Scalars['Int']>,
  /** ??? */
  record_timeline?: Maybe<Scalars['Boolean']>,
  /** ??? */
  render_timeline?: Maybe<Scalars['Boolean']>,
  /** ??? */
  timeline_enabled?: Maybe<Scalars['Boolean']>,
  /** ??? */
  should_upgrade?: Maybe<Scalars['Boolean']>,
  /** ??? */
  achievements_enabled?: Maybe<Scalars['Boolean']>,
  /** ??? TODO: Check type! */
  last_blog_entry?: Maybe<Scalars['String']>,
  /** ??? */
  duration_format?: Maybe<Scalars['String']>,
};

export type Group = {
   __typename?: 'Group',
  /** Unique ID of the group */
  id: Scalars['ID'],
  /** The name of the group (unique in workspace) */
  name: Scalars['String'],
  /** workspace ID, where the group will be used */
  wid: Scalars['ID'],
  /** indicates the time group was last updated */
  at: Scalars['DateTime'],
};

export type GroupCreateInput = {
  name: Scalars['String'],
  wid: Scalars['ID'],
};

export type GroupUpdateInput = {
  name: Scalars['String'],
};

export type InvitationResponse = {
   __typename?: 'InvitationResponse',
  workspace_users: Array<WorkspaceUser>,
  notifications: Array<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createTask: Task,
  updateTask: Task,
  deleteTask: Scalars['Boolean'],
  updateManyTasks: Array<Task>,
  deleteManyTasks: Scalars['Boolean'],
  createTag: Tag,
  updateTag: Tag,
  deleteTag: Scalars['Boolean'],
  createUser: User,
  updateUser: User,
  resetToken: Scalars['String'],
  inviteWorkspaceUser: InvitationResponse,
  updateWorkspaceUser: WorkspaceUser,
  deleteWorkspaceUser: Scalars['Boolean'],
  createGroup: Group,
  updateGroup: Group,
  deleteGroup: Scalars['Boolean'],
  createProject: Project,
  updateProject: Project,
  deleteProject: Array<Scalars['ID']>,
  updateWorkspace: Workspace,
  createClient: Client,
  updateClient: Client,
  deleteClient: Scalars['Boolean'],
};


export type MutationCreateTaskArgs = {
  data: TaskCreateInput
};


export type MutationUpdateTaskArgs = {
  task_id: Scalars['ID'],
  data: TaskUpdateInput
};


export type MutationDeleteTaskArgs = {
  task_id: Scalars['ID']
};


export type MutationUpdateManyTasksArgs = {
  task_ids: Array<Scalars['ID']>,
  data: TaskUpdateInput
};


export type MutationDeleteManyTasksArgs = {
  task_ids: Array<Scalars['ID']>
};


export type MutationCreateTagArgs = {
  data: TagCreateInput
};


export type MutationUpdateTagArgs = {
  tag_id: Scalars['ID'],
  data: TagUpdateInput
};


export type MutationDeleteTagArgs = {
  tag_id: Scalars['ID']
};


export type MutationCreateUserArgs = {
  data: UserCreateInput
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput
};


export type MutationInviteWorkspaceUserArgs = {
  workspace_id: Scalars['ID'],
  data: WorkspaceUserInviteInput
};


export type MutationUpdateWorkspaceUserArgs = {
  workspace_user_id: Scalars['ID'],
  data: WorkspaceUserUpdateInput
};


export type MutationDeleteWorkspaceUserArgs = {
  workspace_user_id: Scalars['ID']
};


export type MutationCreateGroupArgs = {
  data: GroupCreateInput
};


export type MutationUpdateGroupArgs = {
  group_id: Scalars['ID'],
  data: GroupUpdateInput
};


export type MutationDeleteGroupArgs = {
  group_id: Scalars['ID']
};


export type MutationCreateProjectArgs = {
  data: ProjectCreateInput
};


export type MutationUpdateProjectArgs = {
  project_id: Scalars['ID'],
  data: ProjectUpdateInput
};


export type MutationDeleteProjectArgs = {
  project_id: Scalars['ID']
};


export type MutationUpdateWorkspaceArgs = {
  workspace_id: Scalars['ID'],
  data: WorkspaceUpdateInput
};


export type MutationCreateClientArgs = {
  data: ClientCreateInput
};


export type MutationUpdateClientArgs = {
  client_id: Scalars['ID'],
  data: ClientUpdateInput
};


export type MutationDeleteClientArgs = {
  client_id: Scalars['ID']
};

/** ??? */
export type Obm = {
   __typename?: 'Obm',
  included: Scalars['Boolean'],
  nr: Scalars['Int'],
  actions: Scalars['String'],
};

export type Project = {
   __typename?: 'Project',
  id: Scalars['ID'],
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
  users?: Maybe<Array<Maybe<ProjectUser>>>,
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

export type ProjectUser = {
   __typename?: 'ProjectUser',
  id: Scalars['ID'],
  /** project ID */
  pid: Scalars['ID'],
  /** user ID, who is added to the project */
  uid: Scalars['ID'],
  /** workspace ID, where the project belongs to */
  wid: Scalars['ID'],
  /** admin rights for this project */
  manager: Scalars['Boolean'],
  /** 
 * hourly rate for the project user,
   * only for pro workspaces,
   * in the currency of the project's client or in workspace default currency.
 **/
  rate?: Maybe<Scalars['Float']>,
  /** when the project user was last updated */
  at: Scalars['DateTime'],
};

export type Query = {
   __typename?: 'Query',
  /** get current user data */
  user: DetailedUser,
  project?: Maybe<Project>,
  workspace?: Maybe<Workspace>,
  workspaces: Array<Workspace>,
  client?: Maybe<Client>,
  clients: Array<Client>,
};


export type QueryProjectArgs = {
  project_id: Scalars['ID']
};


export type QueryWorkspaceArgs = {
  workspace_id: Scalars['ID']
};


export type QueryClientArgs = {
  client_id: Scalars['ID']
};

export type Tag = {
   __typename?: 'Tag',
  /** Unique ID of the tag */
  id: Scalars['ID'],
  /** The name of the tag (unique in workspace) */
  name: Scalars['String'],
  /** workspace ID, where the tag will be used */
  wid: Scalars['ID'],
};

export type TagCreateInput = {
  name: Scalars['String'],
  wid: Scalars['ID'],
};

export type TagUpdateInput = {
  name: Scalars['String'],
};

export type Task = {
   __typename?: 'Task',
  id: Scalars['ID'],
  /** the name of the task */
  name: Scalars['String'],
  /** project ID for a task */
  pid: Scalars['ID'],
  /** 
 * workspace ID, where the task will be saved
   * (project's workspace id is used when not supplied
 **/
  wid: Scalars['ID'],
  /** user ID, to whom the task is assigned to */
  uid?: Maybe<Scalars['ID']>,
  /** estimated duration of task in seconds */
  estimated_seconds?: Maybe<Scalars['Int']>,
  /** whether the task is done or not (by default true) */
  active: Scalars['Boolean'],
  /** indicates the time task was last updated */
  at: Scalars['DateTime'],
  /** total time tracked (in seconds) for the task */
  tracked_seconds: Scalars['Int'],
};

export type TaskCreateInput = {
  name: Scalars['String'],
  pid: Scalars['ID'],
  wid?: Maybe<Scalars['ID']>,
  active?: Maybe<Scalars['Boolean']>,
};

export type TaskUpdateInput = {
  name: Scalars['String'],
  active?: Maybe<Scalars['Boolean']>,
};

/** basic user data */
export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  /** default workspace id */
  default_wid: Scalars['ID'],
  /** user's email */
  email: Scalars['String'],
  /** user's full name */
  fullname: Scalars['String'],
  /** eg. 'h:i A' */
  jquery_timeofday_format: Scalars['String'],
  /** eg. 'h:i A' */
  jquery_date_format: Scalars['String'],
  /** eg. 'h:mm A' */
  timeofday_format: Scalars['String'],
  /** eg. MM/DD/YYYY */
  date_format: Scalars['String'],
  /** whether start and stop time are saved on time entry */
  store_start_and_stop_time: Scalars['Boolean'],
  /** integer 0-6 (Sunday=0) */
  beginning_of_week: Scalars['Int'],
  /** should a piechart be shown on the sidebar */
  sidebar_piechart: Scalars['Boolean'],
  /** ??? */
  timeline_experiment: Scalars['Boolean'],
};

export type UserCreateInput = {
  /** a valid email */
  email: Scalars['String'],
  /** password at least 6 characters long */
  password: Scalars['String'],
  /** for example 'Etc/UTC' */
  timezone: Scalars['String'],
  /** in free form, name of the app that signed the user app */
  created_with: Scalars['String'],
};

export type UserUpdateInput = {
  fullname?: Maybe<Scalars['String']>,
  /** a valid email */
  email?: Maybe<Scalars['String']>,
  send_product_emails?: Maybe<Scalars['Boolean']>,
  send_weekly_report?: Maybe<Scalars['Boolean']>,
  send_timer_notifications?: Maybe<Scalars['Boolean']>,
  store_start_and_stop_time?: Maybe<Scalars['Boolean']>,
  /** integer 0-6 (Sunday=0) */
  beginning_of_week?: Maybe<Scalars['Int']>,
  /** IANA TZ timezones */
  timezone?: Maybe<Scalars['String']>,
  /** 'YYYY-MM-DD', 'DD.MM.YYYY', 'DD-MM-YYYY', 'MM/DD/YYYY', 'DD/MM/YYYY', 'MM-DD-YYYY' */
  timeofday_format?: Maybe<Scalars['String']>,
  /** 'H:mm' for 24-hour format, 'h:mm A' for 12-hour format (AM/PM) */
  date_format?: Maybe<Scalars['String']>,
};

export type Workspace = {
   __typename?: 'Workspace',
  id: Scalars['ID'],
  /** the name of the workspace */
  name: Scalars['String'],
  /** (if set, otherwise omited) */
  logo_url?: Maybe<Scalars['String']>,
  /** ??? */
  profile?: Maybe<Scalars['Int']>,
  /** if it's a pro workspace or not. Shows if someone is paying for the workspace or not */
  premium: Scalars['Boolean'],
  /** shows whether currently requesting user has admin access to the workspace */
  admin: Scalars['Boolean'],
  /** 
 * default hourly rate for workspace,
   * won't be shown to non-admins if the only_admins_see_billable_rates flag is set to true
 **/
  default_hourly_rate?: Maybe<Scalars['Float']>,
  /** default currency for workspace */
  default_currency?: Maybe<Scalars['String']>,
  /** whether only the admins can create projects or everybody */
  only_admins_may_create_projects: Scalars['Boolean'],
  /** whether only the admins can see billable rates or everybody */
  only_admins_see_billable_rates: Scalars['Boolean'],
  only_admins_see_team_dashboard: Scalars['Boolean'],
  projects_billable_by_default: Scalars['Boolean'],
  /** type of rounding */
  rounding: Scalars['Int'],
  /** round up to nearest minute */
  rounding_minutes: Scalars['Int'],
  api_token: Scalars['String'],
  /** timestamp that indicates the time workspace was last updated */
  at: Scalars['DateTime'],
  /** calendar integration? */
  ical_enabled: Scalars['Boolean'],
  /** most active users (from dashboard) */
  user_activity: Array<WorkspaceUserActivity>,
  /** recent user activities (from dashboard) */
  activity: Array<WorkspaceActivity>,
  /** users in workspace */
  users: Array<WorkspaceUser>,
  /** to get a successful response, the token owner must be workspace admin */
  projects?: Maybe<Array<Maybe<Project>>>,
  /** to get a successful response, the token owner must be workspace admin */
  groups?: Maybe<Array<Maybe<Group>>>,
};

export type WorkspaceActivity = {
   __typename?: 'WorkspaceActivity',
  /** user ID */
  user_id: Scalars['ID'],
  /** project ID (ID is 0 if time entry doesn't have project connected to it) */
  project_id: Scalars['ID'],
  /** 
 * Time entry duration in seconds.
   * If the time entry is currently running, the duration attribute contains a
   * negative value, denoting the start of the time entry in seconds since epoch (Jan 1 1970).
   * The correct duration can be calculated as current_time + duration, where
   * current_time is the current time in seconds since epoch.
 **/
  duration: Scalars['Int'],
  /** Description property is not present if time entry description is empty */
  description?: Maybe<Scalars['String']>,
  /** time entry stop time (ISO 8601 date and time. Stop property is not present when time entry is still running) */
  stop?: Maybe<Scalars['DateTime']>,
  /** task id, if applicable */
  tid?: Maybe<Scalars['ID']>,
};

export type WorkspaceUpdateInput = {
  /** the name of the workspace */
  name: Scalars['String'],
  /** (if set, otherwise omited) */
  logo_url?: Maybe<Scalars['String']>,
  /** ??? */
  profile?: Maybe<Scalars['Int']>,
  /** if it's a pro workspace or not. Shows if someone is paying for the workspace or not */
  premium: Scalars['Boolean'],
  /** shows whether currently requesting user has admin access to the workspace */
  admin: Scalars['Boolean'],
  /** 
 * default hourly rate for workspace,
   * won't be shown to non-admins if the only_admins_see_billable_rates flag is set to true
 **/
  default_hourly_rate?: Maybe<Scalars['Float']>,
  /** default currency for workspace */
  default_currency?: Maybe<Scalars['String']>,
  /** whether only the admins can create projects or everybody */
  only_admins_may_create_projects: Scalars['Boolean'],
  /** whether only the admins can see billable rates or everybody */
  only_admins_see_billable_rates: Scalars['Boolean'],
  only_admins_see_team_dashboard: Scalars['Boolean'],
  projects_billable_by_default: Scalars['Boolean'],
  /** type of rounding */
  rounding: Scalars['Int'],
  /** round up to nearest minute */
  rounding_minutes: Scalars['Int'],
};

export type WorkspaceUser = {
   __typename?: 'WorkspaceUser',
  id: Scalars['ID'],
  /** user id of the workspace user */
  uid: Scalars['ID'],
  /** if user is workspace admin */
  admin: Scalars['Boolean'],
  /** if the workspace user has accepted the invitation to this workspace */
  active: Scalars['Boolean'],
  /** 
 * if user has not accepted the invitation the url for accepting his/her
   * invitation is sent when the request is made by workspace admin
 **/
  invite_url?: Maybe<Scalars['String']>,
};

export type WorkspaceUserActivity = {
   __typename?: 'WorkspaceUserActivity',
  /** user ID */
  user_id: Scalars['ID'],
  /** sum (in seconds) of time entry durations that have been created during last 7 days */
  duration: Scalars['Int'],
};

export type WorkspaceUserInviteInput = {
  emails: Array<Scalars['String']>,
};

/** Only the admin flag can be changed. */
export type WorkspaceUserUpdateInput = {
  admin: Scalars['Boolean'],
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
  DetailedUser: ResolverTypeWrapper<DetailedUser>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Workspace: ResolverTypeWrapper<Workspace>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  WorkspaceUserActivity: ResolverTypeWrapper<WorkspaceUserActivity>,
  WorkspaceActivity: ResolverTypeWrapper<WorkspaceActivity>,
  WorkspaceUser: ResolverTypeWrapper<WorkspaceUser>,
  Project: ResolverTypeWrapper<Project>,
  ProjectUser: ResolverTypeWrapper<ProjectUser>,
  Group: ResolverTypeWrapper<Group>,
  BlogPost: ResolverTypeWrapper<BlogPost>,
  Client: ResolverTypeWrapper<Client>,
  Mutation: ResolverTypeWrapper<{}>,
  TaskCreateInput: TaskCreateInput,
  Task: ResolverTypeWrapper<Task>,
  TaskUpdateInput: TaskUpdateInput,
  TagCreateInput: TagCreateInput,
  Tag: ResolverTypeWrapper<Tag>,
  TagUpdateInput: TagUpdateInput,
  UserCreateInput: UserCreateInput,
  User: ResolverTypeWrapper<User>,
  UserUpdateInput: UserUpdateInput,
  WorkspaceUserInviteInput: WorkspaceUserInviteInput,
  InvitationResponse: ResolverTypeWrapper<InvitationResponse>,
  WorkspaceUserUpdateInput: WorkspaceUserUpdateInput,
  GroupCreateInput: GroupCreateInput,
  GroupUpdateInput: GroupUpdateInput,
  ProjectCreateInput: ProjectCreateInput,
  ProjectUpdateInput: ProjectUpdateInput,
  WorkspaceUpdateInput: WorkspaceUpdateInput,
  ClientCreateInput: ClientCreateInput,
  ClientUpdateInput: ClientUpdateInput,
  Obm: ResolverTypeWrapper<Obm>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  DetailedUser: DetailedUser,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Int: Scalars['Int'],
  Workspace: Workspace,
  Float: Scalars['Float'],
  DateTime: Scalars['DateTime'],
  WorkspaceUserActivity: WorkspaceUserActivity,
  WorkspaceActivity: WorkspaceActivity,
  WorkspaceUser: WorkspaceUser,
  Project: Project,
  ProjectUser: ProjectUser,
  Group: Group,
  BlogPost: BlogPost,
  Client: Client,
  Mutation: {},
  TaskCreateInput: TaskCreateInput,
  Task: Task,
  TaskUpdateInput: TaskUpdateInput,
  TagCreateInput: TagCreateInput,
  Tag: Tag,
  TagUpdateInput: TagUpdateInput,
  UserCreateInput: UserCreateInput,
  User: User,
  UserUpdateInput: UserUpdateInput,
  WorkspaceUserInviteInput: WorkspaceUserInviteInput,
  InvitationResponse: InvitationResponse,
  WorkspaceUserUpdateInput: WorkspaceUserUpdateInput,
  GroupCreateInput: GroupCreateInput,
  GroupUpdateInput: GroupUpdateInput,
  ProjectCreateInput: ProjectCreateInput,
  ProjectUpdateInput: ProjectUpdateInput,
  WorkspaceUpdateInput: WorkspaceUpdateInput,
  ClientCreateInput: ClientCreateInput,
  ClientUpdateInput: ClientUpdateInput,
  Obm: Obm,
};

export type BlogPostResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlogPost'] = ResolversParentTypes['BlogPost']> = {
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  pub_date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type ClientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  wid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, ClientProjectsArgs>,
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

export type GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  wid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type InvitationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvitationResponse'] = ResolversParentTypes['InvitationResponse']> = {
  workspace_users?: Resolver<Array<ResolversTypes['WorkspaceUser']>, ParentType, ContextType>,
  notifications?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'data'>>,
  updateTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'task_id' | 'data'>>,
  deleteTask?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'task_id'>>,
  updateManyTasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationUpdateManyTasksArgs, 'task_ids' | 'data'>>,
  deleteManyTasks?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteManyTasksArgs, 'task_ids'>>,
  createTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationCreateTagArgs, 'data'>>,
  updateTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationUpdateTagArgs, 'tag_id' | 'data'>>,
  deleteTag?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTagArgs, 'tag_id'>>,
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>,
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data'>>,
  resetToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  inviteWorkspaceUser?: Resolver<ResolversTypes['InvitationResponse'], ParentType, ContextType, RequireFields<MutationInviteWorkspaceUserArgs, 'workspace_id' | 'data'>>,
  updateWorkspaceUser?: Resolver<ResolversTypes['WorkspaceUser'], ParentType, ContextType, RequireFields<MutationUpdateWorkspaceUserArgs, 'workspace_user_id' | 'data'>>,
  deleteWorkspaceUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteWorkspaceUserArgs, 'workspace_user_id'>>,
  createGroup?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationCreateGroupArgs, 'data'>>,
  updateGroup?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationUpdateGroupArgs, 'group_id' | 'data'>>,
  deleteGroup?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteGroupArgs, 'group_id'>>,
  createProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'data'>>,
  updateProject?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<MutationUpdateProjectArgs, 'project_id' | 'data'>>,
  deleteProject?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'project_id'>>,
  updateWorkspace?: Resolver<ResolversTypes['Workspace'], ParentType, ContextType, RequireFields<MutationUpdateWorkspaceArgs, 'workspace_id' | 'data'>>,
  createClient?: Resolver<ResolversTypes['Client'], ParentType, ContextType, RequireFields<MutationCreateClientArgs, 'data'>>,
  updateClient?: Resolver<ResolversTypes['Client'], ParentType, ContextType, RequireFields<MutationUpdateClientArgs, 'client_id' | 'data'>>,
  deleteClient?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteClientArgs, 'client_id'>>,
};

export type ObmResolvers<ContextType = any, ParentType extends ResolversParentTypes['Obm'] = ResolversParentTypes['Obm']> = {
  included?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  nr?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  actions?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
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
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProjectUser']>>>, ParentType, ContextType>,
};

export type ProjectUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectUser'] = ResolversParentTypes['ProjectUser']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  pid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  uid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  wid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  manager?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  rate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  user?: Resolver<ResolversTypes['DetailedUser'], ParentType, ContextType>,
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectArgs, 'project_id'>>,
  workspace?: Resolver<Maybe<ResolversTypes['Workspace']>, ParentType, ContextType, RequireFields<QueryWorkspaceArgs, 'workspace_id'>>,
  workspaces?: Resolver<Array<ResolversTypes['Workspace']>, ParentType, ContextType>,
  client?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType, RequireFields<QueryClientArgs, 'client_id'>>,
  clients?: Resolver<Array<ResolversTypes['Client']>, ParentType, ContextType>,
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  wid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  pid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  wid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  uid?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  estimated_seconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  tracked_seconds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
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
  user_activity?: Resolver<Array<ResolversTypes['WorkspaceUserActivity']>, ParentType, ContextType>,
  activity?: Resolver<Array<ResolversTypes['WorkspaceActivity']>, ParentType, ContextType>,
  users?: Resolver<Array<ResolversTypes['WorkspaceUser']>, ParentType, ContextType>,
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>,
  groups?: Resolver<Maybe<Array<Maybe<ResolversTypes['Group']>>>, ParentType, ContextType>,
};

export type WorkspaceActivityResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkspaceActivity'] = ResolversParentTypes['WorkspaceActivity']> = {
  user_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  project_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  stop?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  tid?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
};

export type WorkspaceUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkspaceUser'] = ResolversParentTypes['WorkspaceUser']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  uid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  admin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  invite_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type WorkspaceUserActivityResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkspaceUserActivity'] = ResolversParentTypes['WorkspaceUserActivity']> = {
  user_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  BlogPost?: BlogPostResolvers<ContextType>,
  Client?: ClientResolvers<ContextType>,
  DateTime?: GraphQLScalarType,
  DetailedUser?: DetailedUserResolvers<ContextType>,
  Group?: GroupResolvers<ContextType>,
  InvitationResponse?: InvitationResponseResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Obm?: ObmResolvers<ContextType>,
  Project?: ProjectResolvers<ContextType>,
  ProjectUser?: ProjectUserResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Tag?: TagResolvers<ContextType>,
  Task?: TaskResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  Workspace?: WorkspaceResolvers<ContextType>,
  WorkspaceActivity?: WorkspaceActivityResolvers<ContextType>,
  WorkspaceUser?: WorkspaceUserResolvers<ContextType>,
  WorkspaceUserActivity?: WorkspaceUserActivityResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
import gql from 'graphql-tag';
